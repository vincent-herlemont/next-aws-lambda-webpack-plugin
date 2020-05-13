'use strict';
const {SSR_API_GATEWAY_DNS,SSR_WHITELIST} = require('./parameters');

function setCustomOrigin(request,host) {
 const origin = request.origin ? request.origin : {};
 request.headers = request.headers ? request.headers : {};
 if (request.origin.s3) {
  delete request.origin.s3;
 }
 request.headers['host'] = [{key: 'host', value: host}];
 
 origin.custom = {
  domainName: host,
  customHeaders : {},
  keepaliveTimeout: 5,
  path: "/Prod",
  port: 443,
  protocol: "https",
  readTimeout: 30,
  sslProtocols: [
   "TLSv1",
   "TLSv1.1",
   "TLSv1.2"
  ]
 }
 
 request.origin = origin;
}

function isCookiePresent(headers,name) {
 for (let i = 0; i < headers.cookie.length; i++) {
  if (headers.cookie[i].value.indexOf(name) >= 0) {
   return true
  }
 }
}

function setS3Origin(request) {
 request.headers = request.headers ? request.headers : {};
 if (request.origin.custom) {
  delete request.origin.custom;
 }
 
 if (request.uri.match(/\/$/)) {
  request.uri = `${request.uri}index.html`
 } else if (request.uri.match(/\/(.+\.[^\/]+)$/) === null) {
  request.uri = `${request.uri}.html`
 }
}

function checkSSR(uri) {
// (new RegExp("people/.*/profile")).exec("people/daslkdjaslad/profile");
// "people/[name]/profile".replace(/\[.+\]/,".*");
// (new RegExp("^/people/.*/profile$")).exec("/people/daslkdjaslad/profile");
 for (const path of SSR_WHITELIST) {
  console.log("path",path)
  let regex = `^${path.replace(/\[.+\]/,".*")}$`;
  console.log("regex",regex);
  let result_regex = (new RegExp(regex)).exec(uri);
  console.log("result_regex",result_regex);
  return result_regex !== null;
 }
}

exports.handler = (event, context, callback) => {
 const request = event.Records[0].cf.request;
 console.log('INTPUT');
 console.log(JSON.stringify(request,0,1));
 
 if (request.headers) {
  if (checkSSR(request.uri)) {
   setCustomOrigin(request,SSR_API_GATEWAY_DNS)
  } else {
   setS3Origin(request)
  }
 }
 
 console.log('OUTPUT');
 console.log(JSON.stringify(request,0,1));
 
 callback(null, request);
};