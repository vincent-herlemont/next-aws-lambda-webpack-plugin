const GenerateAwsLambda = require('next-aws-lambda-webpack-plugin');

module.exports = {
    target: 'serverless',
    webpack: (config, {isServer}) => {
        config.plugins.push(new GenerateAwsLambda(isServer));
        return config
    },
};