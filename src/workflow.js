const path = require('path');
const {mkdir,assertExistDirectory} = require('./utils');
const buildLambda = require('./lambda');
const buildLayer = require('./layer');

const workflow = (context,dev,isServer) => {
    if (!isServer || dev) {return}

    const pagesDir = path.join(context, '/.next/serverless/pages/');
    assertExistDirectory(pagesDir);

    const lambdasDir = path.join(context, '/out_lambda');
    mkdir(lambdasDir);

    const functionDir = path.join(lambdasDir, 'function' );
    mkdir(functionDir);

    buildLambda(pagesDir,functionDir);

    const layerDir = path.join(lambdasDir, 'layer' );
    mkdir(layerDir);

    buildLayer(layerDir);
};

module.exports = workflow;