const { inPages } = require("./lambda");

const SSRPages = (SSR_PAGES = ["/people/[name]/profile", "/index"]);

test("check inSSRPages with pages", async () => {
  let pathEntry =
    "/home/paul/work/next-aws-lambda-webpack-plugin/example/.next/serverless/pages/people/[name]/profile.js";
  expect(inPages(pathEntry, SSRPages)).toEqual(true);
  pathEntry =
    "/home/paul/work/next-aws-lambda-webpack-plugin/example/.next/serverless/pages/people/[name]/messages.js";
  expect(inPages(pathEntry, SSRPages)).toEqual(false);
});

test("check inSSRPages with no pages", async () => {
  let pathEntry =
    "/home/paul/work/next-aws-lambda-webpack-plugin/example/.next/serverless/pages/people/[name]/profile.js";
  expect(inPages(pathEntry, [])).toEqual(true);
  pathEntry =
    "/home/paul/work/next-aws-lambda-webpack-plugin/example/.next/serverless/pages/people/[name]/messages.js";
  expect(inPages(pathEntry, [])).toEqual(true);
});
