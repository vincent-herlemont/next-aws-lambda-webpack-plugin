const path = require('path');
const fs = require('fs');
const {mkdir} = require('./utils');

const explore = (pagesDir,functionDir) => {
    mkdir(functionDir);

    fs.readdir(pagesDir, (err, entries) => {
        if (err) { throw "unable to scan directory" + err }

        entries.forEach((entry) => {
            pathEntry = path.join(pagesDir,entry);

            if (fs.statSync(pathEntry).isDirectory()) {
                explore(pathEntry,path.join(functionDir,entry));
                return
            }

            if (path.extname(entry) === '.js') {
                const lambdaPath = path.join(functionDir,`f_${path.parse(entry).name}`);
                mkdir(lambdaPath);
                fs.copyFileSync(pathEntry,path.join(lambdaPath,entry));

                const handlerFileContent = `
// Require next-aws-lambda layer
const compat = require("next-aws-lambda");
const page = require("./${entry}");
                
module.exports.render = async (event, context, callback) => {
  const responsePromise = compat(page)(event, context); // don't pass the callback parameter
  return responsePromise;
};
                `;
                const handlerPath = path.join(lambdaPath,'handler.js');
                if (!fs.existsSync(handlerPath)) {
                    fs.writeFileSync(handlerPath, handlerFileContent);
                }
            }
        });
    });
};

module.exports = explore;