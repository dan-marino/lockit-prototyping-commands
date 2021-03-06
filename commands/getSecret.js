// TODO: pass in secretName, version, tableNme

import getItem from "../aws/dynamodb/getItem.js";
import decryptItem from "../aws/encryption/decryptItem.js";
import base64ToAscii from "../utils/base64ToAscii.js";

const getSecret = async (tableName, secretName) => {
  const version = "1";

  try {
    const encryptedSecret = await getItem(secretName, version, tableName);
    const decryptedSecretBlob = await decryptItem(encryptedSecret);
    const decryptedSecret = base64ToAscii(decryptedSecretBlob);

    console.log("decrypted secret:", decryptedSecret);
  } catch (error) {
    console.log(error, error.stack);
  }
};

export default getSecret;