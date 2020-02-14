const {execSync} = require('child_process');

const build = (layerDir) => {
    const nodeJsDir = path.join(layerDir, 'nodejs' );
    mkdir(nodeJsDir);

    const packageFileContent = `
{
  "dependencies": {
    "next-aws-lambda": "^2.3.4"
  }
}
`;
    fs.writeFileSync(path.join(nodeJsDir,'package.json'), packageFileContent);
    execSync("npm install", {
        cwd:nodeJsDir,
    });
};

module.exports = build;