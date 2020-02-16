const workflow = require('./src/workflow');

/**
 * Plugin Webpack
 */
class AwsLambda {

    constructor(dev,isServer) {
        this.dev = dev;
        this.isServer = isServer;
    }

    apply(compiler) {
        const {context} = compiler;
        compiler.hooks.done.tap('AwsLambda', () => {
            workflow(context,this.dev,this.isServer);
        });
    }
}

module.exports = AwsLambda;