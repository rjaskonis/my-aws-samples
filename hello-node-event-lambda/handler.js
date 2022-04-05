"use strict";

module.exports.run = async (event) => {
    return {
        statusCode: 200,
        body: JSON.stringify(
            {
                message: "Event triggered lambda just fine",
            },
            null,
            2
        ),
    };
};
