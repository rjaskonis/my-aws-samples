const http = require("http");
const awsServerlessExpress = require("aws-serverless-express");
const app = require("./app");

const awsServerlessExpressServer = awsServerlessExpress.createServer(app);
const httpServer = http.createServer(app);

const awsExpressHandler = (event, context) => awsServerlessExpress.proxy(awsServerlessExpressServer, event, context);

module.exports = { awsExpressHandler, httpServer };

if (require.main === module) httpServer.listen(3003);
