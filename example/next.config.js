const GenerateAwsLambda = require('next-aws-lambda-webpack-plugin');

module.exports = {
    target: 'serverless',
    webpack: (config, nextConfig) => {
        config.plugins.push(new GenerateAwsLambda(nextConfig));
        return config
    },
};