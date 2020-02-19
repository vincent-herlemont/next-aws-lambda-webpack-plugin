const workflow = require('./src/workflow');

const DefaultOptions = {
    distDir:"out_lambda",
    prefix:"l",
};

/**
 * Plugin Webpack
 */
class AwsLambdaGenerator {

    constructor(dev,isServer,options) {
        this.dev = dev;
        this.isServer = isServer;
        this.options = Object.assign(DefaultOptions,options);
    }

    apply(compiler) {
        const {context} = compiler;
        compiler.hooks.done.tap('AwsLambda', () => {
            workflow(context,this.dev,this.isServer,this.options);
        });
    }
}

module.exports = AwsLambdaGenerator;