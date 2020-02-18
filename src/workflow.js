const path = require('path');
const {mkdir,assertExistDirectory} = require('./utils');
const buildLambda = require('./lambda');
const buildLayer = require('./layer');
const efs = require('fs-extra');


const workflow = (context,dev,isServer) => {
    if (!isServer || dev) {return}

    const pagesDir = path.join(context, '/.next/serverless/pages/');
    assertExistDirectory(pagesDir);

    const lambdasDir = path.join(context, '/out_lambda');
    mkdir(lambdasDir);

    const functionDir = path.join(lambdasDir, 'function' );
    efs.removeSync(functionDir);
    mkdir(functionDir);

    buildLambda(pagesDir,functionDir);

    const layerDir = path.join(lambdasDir, 'layer' );
    mkdir(layerDir);

    buildLayer(layerDir);
};

module.exports = workflow;