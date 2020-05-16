const tmp = require('tmp');
const fs = require('fs-extra');
const path = require('path');
const dirTree = require("directory-tree");
const {execSync} = require('child_process');

const VERSION = require("minimist")(process.argv.slice(2))["version"];

let tmpDir;
beforeEach(async () => {
    tmpDir = await createTmp();
});

afterEach(async () => {
    tmpDir.cleanupTmp();
});

test('build example',async () => {
    const {tmpDirPath} = tmpDir;

    syncExampleDirectory(tmpDirPath);

    createPackageFile(tmpDirPath);

    run(tmpDirPath);

    const dirOutLambdaPath = path.join(tmpDirPath,'out_lambda');
    expect(fs.existsSync(dirOutLambdaPath));

    const tree = dirTree(dirOutLambdaPath,{
        exclude: /^.*\/node_modules\/.*$/
    });
    treeLight(tree);
    expect(tree).toMatchSnapshot();
});

const createTmp = () => {
    return new Promise((resolve, reject) => {
        tmp.dir({ template: 'test-next-aws-lambda-webpack-plugin-XXXXXX' },function _tempDirCreated(err, tmpDirPath, cleanupCallback) {
            if (err) reject(err);
            console.info('tmpDirPath : ', tmpDirPath);
            resolve({
                tmpDirPath,
                cleanupTmp:cleanupCallback,
            });
        });
    });
};

const syncExampleDirectory = (tmpDirPath) => {
    const localExamplePath = path.join(__dirname,'../example');
    fs.copySync(localExamplePath,tmpDirPath,{
        filter:(entry) => {
            return !!path.relative(__dirname,entry)
                .match(/^..\/example\/?((pages|distribution|public|next\.config\.js).*)?$/g);
        }
    });
};

const createPackageFile = (tmpDirPath) => {
    const version = VERSION !== undefined ? VERSION : "latest";
    const packageFileContent = `
{
  "scripts": {
    "build": "next build"
  },
  "dependencies": {
    "next": "${version}",
    "react": "latest",
    "react-dom": "latest"
  },
  "devDependencies": {
    "next-aws-lambda-webpack-plugin": "file:${path.join(__dirname,"../")}"
  }
}
`;
    console.info(packageFileContent);
    fs.writeFileSync(path.join(tmpDirPath,'package.json'), packageFileContent);
};

const run = (tmpDirPath) => {
    let output = execSync("npm install", {
        cwd:tmpDirPath,
    }).toString();
    console.info(output);

    output = execSync("npm run build", {
        cwd:tmpDirPath,
    }).toString();
    console.info(output);
};

const treeLight = (tree) => {
    if (tree.children && tree.children.length) {
        tree.children.map(e => {
            treeLight(e);
        });
    }
    delete tree.size;
    delete tree.path;
    return tree;
};