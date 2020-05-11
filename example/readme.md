# Install

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

Deployment for the first time and create `samconfig.yaml` file.
```
$> sam deploy --guided
```
After you can use `sam deploy` without `--guided`.

---
For **Reset** the project :
```
$> npm run raz
```
That delete all generated file (_sam configuration included_).
