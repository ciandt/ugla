# Ugla

[![Open issues](https://img.shields.io/github/issues-raw/ciandt/ugla.svg)](https://github.com/ciandt/ugla/issues)
![licence](https://img.shields.io/npm/l/ugla.svg)
![version](https://img.shields.io/github/package-json/v/ciandt/ugla.svg)
[![angular](https://img.shields.io/github/package-json/dependency-version/ciandt/ugla/dev/@angular/cli.svg)](https://angular.io)
![Build Production](https://github.com/ciandt/ugla/workflows/Build%20Production/badge.svg?branch=master)

## Versioning
Given a version number MAJOR.MINOR.PATCH, increment the:

1. MAJOR version when you make incompatible API changes,
1. MINOR version when you add functionality in a backwards-compatible manner, and
1. PATCH version when you make backwards-compatible bug fixes.

Additional labels for pre-release and build metadata are available as extensions to the MAJOR.MINOR.PATCH format.

# Contributing
Would you like to contribute to the Ugla project?

## Ugla Library
To contribute to the Ugla project, you must first have an environment ready to run Angular.

### Starting
Fork [Ugla](https://github.com/ciandt/ugla), make any changes you feel necessary and submit a **Pull Request**.
PRs are evaluated and the code will be tested, if it meets our standards, will be integrated into the main code and a new version will be generated.

### Running
To test at development time, run the `npm start` command.
Remember, `npm start` executes` ng serve`.

### Tests
Remember to submit any code snippets before executing the following commands and correcting possible alerts:

```bash
npm run lint
```

This command will run lint for both Typescript and SCSS.

### Creating Components
To create a component, run the command:
```bash
ng g c components/<component name> --project=ugla
```

To create a directive, run the command:
```bash
ng g directive directives/<directive name> --project=ugla
```

To create a service, run the command:
```bash
ng g service services/<service name> --project=ugla
```

### Testing on a Local Project
Run this command on Ugla root path:
```bash
npm run build-lib
```

The `dist 'directory will be created with a file as follows:` ugla-x.y.z.tgz`, where X, Y and Z is the version number.

Then go to the project you want to use Ugla and `package.json` by adding a line below the dependencies:

```bash
"ugla": "<ugla directory>/dist/ugla-x.y.z.tgz"
```

Run `npm install` on the project and Ugla will be installed and can be tested as if using a published version.

## Oficial Site
Read more on: [Ugla](https://ugla.dev)

## Contributors
[![](https://sourcerer.io/fame/regivaldo/ciandt/ugla/images/0)](https://sourcerer.io/fame/regivaldo/ciandt/ugla/links/0)[![](https://sourcerer.io/fame/regivaldo/ciandt/ugla/images/1)](https://sourcerer.io/fame/regivaldo/ciandt/ugla/links/1)[![](https://sourcerer.io/fame/regivaldo/ciandt/ugla/images/2)](https://sourcerer.io/fame/regivaldo/ciandt/ugla/links/2)[![](https://sourcerer.io/fame/regivaldo/ciandt/ugla/images/3)](https://sourcerer.io/fame/regivaldo/ciandt/ugla/links/3)[![](https://sourcerer.io/fame/regivaldo/ciandt/ugla/images/4)](https://sourcerer.io/fame/regivaldo/ciandt/ugla/links/4)[![](https://sourcerer.io/fame/regivaldo/ciandt/ugla/images/5)](https://sourcerer.io/fame/regivaldo/ciandt/ugla/links/5)[![](https://sourcerer.io/fame/regivaldo/ciandt/ugla/images/6)](https://sourcerer.io/fame/regivaldo/ciandt/ugla/links/6)[![](https://sourcerer.io/fame/regivaldo/ciandt/ugla/images/7)](https://sourcerer.io/fame/regivaldo/ciandt/ugla/links/7)
