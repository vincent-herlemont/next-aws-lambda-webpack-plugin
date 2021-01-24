// A light Npm client.
const https = require("https");

module.exports = class Npm {
  constructor(packageName) {
    this.uri = `https://registry.npmjs.org/${packageName}`;
  }

  show() {
    return new Promise((resolve, reject) => {
      https
        .get(this.uri, (res) => {
          res.setEncoding("utf8");
          let rawData = "";
          res.on("data", (chunk) => {
            rawData += chunk;
          });
          res.on("end", () => {
            try {
              resolve(JSON.parse(rawData));
            } catch (e) {
              reject(e);
            }
          });
        })
        .on("error", reject);
    });
  }

  getLastVersion() {
    return new Promise((resolve, reject) => {
      this.show()
        .then((data) => {
          if (data["dist-tags"] && data["dist-tags"]["latest"]) {
            resolve(data["dist-tags"]["latest"]);
            return;
          }
          reject("package.dist-tags.latest not found");
        })
        .catch((e) => {
          reject(e);
        });
    });
  }
};
