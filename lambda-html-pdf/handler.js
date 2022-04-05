const fs = require("fs");
const path = require("path");
const htmlPdf = require("html-pdf");

process.env["PATH"] = process.env["PATH"] + ":" + process.env["LAMBDA_TASK_ROOT"];

async function run(event) {
    const html = fs.readFileSync(path.join(__dirname, "sample.html")).toString();

    console.log(html);

    try {
        const pdf = await convertHTML2PDF(html);

        console.log(pdf);
    } catch (err) {
        console.log(err);
    }

    // console.log(pdf);

    // fs.writeFileSync(path.join(__dirname, "result.pdf"), pdf)

    return {
        statusCode: 200,
        body: JSON.stringify(
            {
                message: "Go Serverless v1.0! Your function executed successfully!",
                input: event,
            },
            null,
            2
        ),
    };
}

async function convertHTML2PDF(html) {
    return new Promise((resolve, reject) => {
        htmlPdf
            .create(html, {
                format: "A4",
                orientation: "portrait",
                // This is the path for compiled phantomjs executable stored in layer.
                // To test locally comment out the following line.
                // phantomPath: "/opt/phantomjs_linux-x86_64",
                phantomPath: "./phantomjs_lambda/phantomjs_linux-x86_64",
            })
            .toBuffer((err, buffer) => {
                if (err) {
                    console.log(err);
                    return reject(err);
                }

                resolve(buffer);
            });
    });
}

module.exports = {
    run,
};

run();
