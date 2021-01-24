const fs = require("fs");

const assertExistDirectory = (path) => {
  if (!fs.existsSync(path) || !fs.statSync(path).isDirectory()) {
    throw `fail to found ${path} directory !`;
  }
};

const mkdir = (path) => {
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path);
  }
};

module.exports = {
  assertExistDirectory,
  mkdir,
};
