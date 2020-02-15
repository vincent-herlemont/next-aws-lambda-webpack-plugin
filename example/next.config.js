const AwsLambda = require('next-aws-lambda-webpack-plugin');

module.exports = {
    target: 'serverless',
    webpack: (config, {isServer}) => {
        config.plugins.push(new AwsLambda(isServer));
        return config
    },
};