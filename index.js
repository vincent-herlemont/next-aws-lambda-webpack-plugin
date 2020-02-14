const workflow = require('./src/workflow');

/**
 * Plugin Webpack
 */
class AwsLambda {

    constructor(isServer) {
        this.isServer = isServer;
    }

    apply(compiler) {
        const {context} = compiler;
        compiler.hooks.done.tap('AwsLambda', () => {
            workflow(context,this.isServer);
        });
    }
}

module.exports = AwsLambda;