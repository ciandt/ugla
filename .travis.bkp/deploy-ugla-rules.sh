#!/bin/sh

config() {
  printf "//`node -p \"require('url').parse('https://registry.npmjs.org').host\"`/:_authToken=${NPM_TOKEN}\nregistry=${NPM_REGISTRY_URL:-https://registry.npmjs.org}\n" >> ~/.npmrc
}

install() {
  npm install -g @angular/cli@7.1.4
  npm install
}

build() {
  node -e 'require("./version").changeConfig()';
  ng build --project=ugla-rules
  if [[ `git status --porcelain` ]]; then
    git checkout -b trevis-version
    git add .
    git commit --message "Travis build: $TRAVIS_BUILD_NUMBER"
    git request-pull trevis-version https://github.com/ciandt/ugla master
    git push origin trevis-version:master
  fi
  cp LICENSE dist/ugla-rules
}

publish() {
  cd dist/ugla-rules
  npm publish
}

config
install
build && publish
