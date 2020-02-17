const tmp = require('tmp');
const fs = require('fs-extra');
const path = require('path');
const dirTree = require("directory-tree");
const {execSync} = require('child_process');

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
                .match(/^..\/example\/?((pages|public|next\.config\.js).*)?$/g);
        }
    });
};

const createPackageFile = (tmpDirPath) => {
    const packageFileContent = `
{
  "scripts": {
    "build": "next build"
  },
  "dependencies": {
    "next": "9.2.1",
    "react": "16.12.0",
    "react-dom": "16.12.0",
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