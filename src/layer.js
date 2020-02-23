const fs = require('fs');
const path = require('path');
const {execSync} = require('child_process');
const {mkdir} = require('./utils');
const Npm = require('./npm');

const PACKAGE_NAME = "next-aws-lambda";

const build = async (layerDir) => {
    const nodeJsDir = path.join(layerDir, 'nodejs' );
    mkdir(nodeJsDir);

    const packageFile = path.join(nodeJsDir,'package.json');

    if (!fs.existsSync(packageFile)) {
        const npm = new Npm(PACKAGE_NAME);
        const nextAwsLambdaLastVersion = await npm.getLastVersion();
        const packageFileContent = `
{
  "dependencies": {
    "${PACKAGE_NAME}": "^${nextAwsLambdaLastVersion}"
  }
}
        `;
        fs.writeFileSync(packageFile, packageFileContent);
    }

    execSync("npm install", {
        cwd:nodeJsDir,
    });
};

module.exports = build;