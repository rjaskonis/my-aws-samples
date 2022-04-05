"use strict";

const fs = require("fs");
const csv = require("csv-parser");

function getPeople() {
    return new Promise((resolve, reject) => {
        const people = [];

        try {
            fs.createReadStream("people.csv")
                .pipe(csv({ separator: "," }))
                .on("data", (line) => {
                    people.push(line);
                })
                .on("end", () => {
                    resolve(people);
                });
        } catch (ex) {
            reject(ex);
        }
    });
}

async function hello(event) {
    const people = await getPeople();

    console.log(people);

    return {
        statusCode: 200,
        body: JSON.stringify(
            {
                message: "Go Serverless v2.0! Your function executed successfully!",
                input: event,
            },
            null,
            2
        ),
    };
}

module.exports = {
    hello,
};
