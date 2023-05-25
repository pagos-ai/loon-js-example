import * as openpgp from 'openpgp';

export async function encryptPgp(payload, armoredKey) {
    const publicKey = await openpgp.readKey({ armoredKey });

    const encrypted = await openpgp.encrypt({
        message: await openpgp.createMessage({ text: payload }),
        encryptionKeys: publicKey,
    });

    return encrypted;
}

export async function decryptPgp(armoredMessage, armoredKey) {
    const privateKey = await openpgp.readKey({ armoredKey });

    const message = await openpgp.readMessage({
        armoredMessage
    });

    const { data: decrypted } = await openpgp.decrypt({
        message,
        decryptionKeys: privateKey
    });

    return decrypted;
 }