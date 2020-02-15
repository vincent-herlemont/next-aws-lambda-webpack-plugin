# next-aws-lambda-webpack-plugin

[![npm puppeteer package](https://img.shields.io/npm/v/next-aws-lambda-webpack-plugin.svg)](https://www.npmjs.com/package/next-aws-lambda-webpack-plugin)

This plugin will generate aws-lambda compatible function for each [nextjs pages](https://nextjs.org/docs/basic-features/pages). 
After that, you can to use functions with the [AWS cloudformation template](https://aws.amazon.com/cloudformation/resources/templates/) or/and [AWS serverless template](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/what-is-sam.html).

This plugin use the [next-aws-lambda](https://github.com/danielcondemarin/serverless-next.js/tree/master/packages/next-aws-lambda)
 create by and for the [serverless](https://serverless.com/) community :heart:.

### Requirement

1. Use [nextjs](https://nextjs.org/docs/getting-started) CLI for build your project (`next build`)
    * The configuration file [next.config.js](https://nextjs.org/docs/api-reference/next.config.js/build-target) must use `target: 'serverless'`.
2. Use [SAM](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/what-is-sam.html) or [AWS CLI cloudformation](https://docs.aws.amazon.com/cli/latest/reference/cloudformation/index.html) for your deployment. 

# Install

Use npm :
```
npm install next-aws-lambda-webpack-plugin
```

### Configuration

Add the plugin to the NextJS ([next.config.js](https://nextjs.org/docs/api-reference/next.config.js/build-target)) configuration file.

| Plugin Arguments    | Required      |
| ------------- |:-------------:|
| isServer      | YES           |

```
const GenerateAwsLambda = require('next-aws-lambda-webpack-plugin');

module.exports = {
    target: 'serverless',
    webpack: (config, {isServer}) => {
        config.plugins.push(new GenerateAwsLambda(isServer));
        return config
    },
};
```


### Example


([see](https://github.com/vincent-herlemont/next-aws-lambda-webpack-plugin/tree/master/example)) TODO
