const path = require("path");
const { mkdir, assertExistDirectory } = require("./utils");
const { explore } = require("./lambda");
const buildLayer = require("./layer");
const efs = require("fs-extra");

const workflow = async (context, dev, isServer, nextDistDir, options) => {
  if (!isServer || dev) {
    return;
  }

  const pagesDir = path.join(context, nextDistDir, "/serverless/pages/");
  assertExistDirectory(pagesDir);

  const lambdasDir = path.join(context, options.distDir);
  mkdir(lambdasDir);

  const functionDir = path.join(lambdasDir, "lambda");
  efs.removeSync(functionDir);
  mkdir(functionDir);

  explore(pagesDir, functionDir, options);

  const layerDir = path.join(lambdasDir, "layer");
  mkdir(layerDir);

  await buildLayer(layerDir);
};

module.exports = workflow;
