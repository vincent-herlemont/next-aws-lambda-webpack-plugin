![cloud-front-distribution-example](../assets/cloud-front-distribution-example.png)

# Install

Clone the project and go to [example folder](https://github.com/vincent-herlemont/next-aws-lambda-webpack-plugin/tree/master/example)

### 1) Api Gateway (SSR Rendering)

Requirement : An aws account with [aws sam](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-install.html)
installed.

In the example folder, install :
```
$> npm install
```

You can check on your browser if all works.
```
$> npm run dev
```

Build for serverless and generate `out_lambda` directory.
```
$> npm run build
```

Deployment for the first time and create `samconfig.yaml` file. Follow the guide line and
choose the regions of your choice.
```
$> sam deploy --guided
```
After you can use `sam deploy` without `--guided`.

### 2) CloudFront Distribution (Routing And Static Rendering)


First configure the routing.
It's a lambda@edge function that embed the routing logic. 
We have to provide some parameters, edit `./distribution/router/parameters.js`. Note : there are many ways
for dealing with external data on lambda@edge function for more flexibility [here](https://aws.amazon.com/blogs/networking-and-content-delivery/leveraging-external-data-in-lambdaedge/).
In our example we have to choice to store parameters in the router source code.

```js
exports.SSR_API_GATEWAY_DNS = '<id>.execute-api.<region>.amazonaws.com';
exports.SSR_PAGES = [
 '/people/[name]/profile',
 '/index'
]
```

- **SSR_API_GATEWAY_DNS** : [This is a REST APIs endpoint of Amazon API Gateway](https://docs.aws.amazon.com/apigateway/latest/developerguide/how-to-call-api.html).
You can get this one with the following command (take care to specified `region` and `stack-name` of api gateway stack that you have specified before).
``` 
$> aws --region <region> cloudformation describe-stacks --stack-name <stack-name> --query 'Stacks[0].Outputs[?OutputKey==`ApiURL`].OutputValue' --output text
```
Now you have retrieved the dns, you can edit `SSR_API_GATEWAY_DNS` in `parameters.js`
- **SSR_PAGES** : This is the whitelist of pages that will routing to api gateway for SSR Rendering.

Seconds go to the [`distribution` folder](https://github.com/vincent-herlemont/next-aws-lambda-webpack-plugin/tree/master/example/distribution), and deploy the project with `sam` on `us-east-1` aws region :
it's mandatory for deploy lambda@edge function.
```
$> cd distribution
$> sam deploy --guided
``` 

Now you have to sync static assets. Come back to the example folder `cd ..`.

Generate the static assets with `export`.
```
$> npm run export
```
Retrieve the s3 bucket name of the distribution stack with this command :  
```
$> aws --region us-east-1 cloudformation describe-stacks --stack-name <stack-name> --query 'Stacks[0].Outputs[?OutputKey==`BucketName`].OutputValue' --output text
``` 
Now you have the bucket name, you can sync the `out/` generate by NextJS.
```
$> aws s3 sync --delete out/ s3://<bucket_name>
```

Now you can display the website in your cloudfront endpoint `https://<id>.cloudfront.net` . The following command to retrieve cloudfront dns. (Set `stack-name` parameters).
```
$> aws --region us-east-1 cloudformation describe-stacks --stack-name <stack-name> --query 'Stacks[0].Outputs[?OutputKey==`DistributionDns`].OutputValue' --output text
```


#  Deployment

For most deployment, some steps have to be executed.
:point_right: You can make a deployment script for automate all the workflow.

Static website
-  **static assets generation** `$> npm run export`
-  **s3 synchronisation** `$> aws s3 sync --delete out/ s3://<bucket_name>`

SSR
- **deploy api gateway** `$> sam deploy`

Router
- **deploy distribution** `$ distribution > sam deploy`

---
# RAZ
```
$> npm run raz
```
That delete all generated files (_sam configuration included_).

