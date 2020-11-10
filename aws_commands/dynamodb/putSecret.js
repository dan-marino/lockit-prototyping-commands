import AWS from "aws-sdk";
import encryptSecret from "../kms/encryptSecret.js"
import dotenv from 'dotenv';
dotenv.config();

const region = process.env["REGION"];
const dynamodb = new AWS.DynamoDB({ region });
const tableName = "DevSecrets";
const secretName = "NewSecret";
const plaintextSecret = "HelloWorld";
const version = "1";

const encryptCallback = encryptedSecret => {
  const params = {
    Item: {
      SecretName: {
        S: secretName,
      },
      SecretValue: {
        B: encryptedSecret,
      },
      Version: {
        S: version,
      },
    },
    ReturnConsumedCapacity: "TOTAL",
    TableName: tableName,
  };

  dynamodb.putItem(params, function (err, data) {
    if (err) console.log(err, err.stack);
    else console.log(data);
  });
}

encryptSecret(plaintextSecret, encryptCallback);