import { kms } from "../services.js";

const decryptSecret = secret => {
  const params = {
    CiphertextBlob: secret,
  };

  kms.decrypt(params, function (err, data) {
    if (err) console.log(err, err.stack);
    else {
      let buff = Buffer.from(data.Plaintext, "base64");
      let text = buff.toString("ascii");
      console.log("Decrypted secret: ", text);
    }
  });
}

export default decryptSecret;