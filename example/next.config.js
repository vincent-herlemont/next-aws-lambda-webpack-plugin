const GenerateAwsLambda = require('next-aws-lambda-webpack-plugin');
const {SSR_PAGES} = require('./distribution/router/parameters');

module.exports = {
    target: 'serverless',
    webpack: (config, nextConfig) => {
        config.plugins.push(new GenerateAwsLambda(nextConfig,
         {
             pages:SSR_PAGES,
         }));
        return config
    },
};