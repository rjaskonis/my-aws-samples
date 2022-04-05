const express = require("express");
const app = express();
const gzip = require("./gzip");
const compression = require("compression");

app.use(compression());

app.get("/", async (req, res) => {
    // res.header("Content-Type", "text/plain");
    res.header("Content-Encoding", "gzip");
    res.header("isBase64Encoded", true);

    const response = await gzip("Hello");

    console.log("response", response);

    res.send("response");
});

module.exports = app;
