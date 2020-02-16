const GenerateAwsLambda = require('next-aws-lambda-webpack-plugin');

module.exports = {
    target: 'serverless',
    webpack: (config, {dev,isServer}) => {
        config.plugins.push(new GenerateAwsLambda(dev,isServer));
        return config
    },
};