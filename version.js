'use strict';

var fs = require('fs-extra');
var packageProject = require('./projects/ugla/package.json');
var packageWorkspace = require('./package.json');

/**
 * Set config file
 */
module.exports.changeConfig = function() {
  fs.writeFileSync(
    './projects/ugla/src/lib/config.ts',
    `export const VERSION = '${packageProject.version}';\n`,
    { encoding: 'utf-8' }
  );
}

/**
 * Change version
 */
module.exports.changeVersion = function(version) {
  packageProject.version = `${version}`;
  packageWorkspace.version = `${version}`;

  fs.writeFileSync(
    './projects/ugla/package.json',
    JSON.stringify(packageProject, null, 2) + '\n',
    { encoding: 'utf-8' }
  );

  fs.writeFileSync(
    './package.json',
    JSON.stringify(packageWorkspace, null, 2) + '\n',
    { encoding: 'utf-8' }
  );
}
