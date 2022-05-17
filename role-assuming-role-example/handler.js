const AWS = require("aws-sdk");
async function handler(event) {
  console.log("event:", JSON.stringify(event, null, 4));

  // AWS.config.credentials = new AWS.SharedIniFileCredentials({ profile: "brlink-cloudinsights" }); // this loads from ~/.aws/credentials

  const sts = new AWS.STS(); // this loads from the environment variables

  const assumedRole = await sts
    .assumeRole({
      RoleArn: "arn:aws:iam::28666662620:role/intermediateRole",
      RoleSessionName: "session1",
    })
    .promise();
  const credentials = assumedRole.Credentials;

  console.log(credentials);

  const stsCloudSOC = new AWS.STS({
    credentials: new AWS.Credentials({
      accessKeyId: credentials.AccessKeyId,
      secretAccessKey: credentials.SecretAccessKey,
      sessionToken: credentials.SessionToken,
    }),
  });

  const brasilsegAssumedRole = await stsCloudSOC
    .assumeRole({
      RoleArn: "arn:aws:iam::28666662620:role/targetRole",
      RoleSessionName: "session2",
    })
    .promise();

  console.log(brasilsegAssumedRole);

  return {};
}

module.exports = {
  handler,
};
