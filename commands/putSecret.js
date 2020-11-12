// TODO: pass in arguments instead of using variables

import putItem from "../aws/dynamodb/putItem.js";
import encryptItem from "../aws/encryption/encryptItem.js";

const putSecret = async () => {
  const tableName = "MoreSecrets";
  const secretName = "foo";
  const plaintextSecret = "hello";
  const version = "1";

  try {
    // TODO: add success console logs
    const encryptedSecret = await encryptItem(plaintextSecret);
    await putItem(secretName, encryptedSecret, version, tableName);
  } catch (error) {
    console.log(error, error.stack);
  }
};

export default putSecret;