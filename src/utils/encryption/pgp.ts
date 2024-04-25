import * as openpgp from "openpgp";

export async function encryptPgp(
  payload: string,
  armoredKey: string,
): Promise<string> {
  const publicKey = await openpgp.readKey({ armoredKey });

  const encrypted = await openpgp.encrypt({
    message: await openpgp.createMessage({ text: payload }),
    encryptionKeys: publicKey,
  });

  return encrypted.toString();
}

export async function decryptPgp(
  armoredMessage: string,
  armoredKey: string,
  passphrase?: string,
): Promise<string> {
  const privateKey =
    passphrase == undefined
      ? await openpgp.readKey({ armoredKey })
      : await openpgp.decryptKey({
          privateKey: await openpgp.readPrivateKey({ armoredKey }),
          passphrase,
        });

  const message = await openpgp.readMessage({
    armoredMessage,
  });

  const { data: decrypted } = await openpgp.decrypt({
    message,
    decryptionKeys: privateKey.isPrivate() ? privateKey : undefined,
  });

  return decrypted.toString();
}
