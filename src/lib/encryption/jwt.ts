import * as crypto from "crypto";
import { CompactEncrypt, compactDecrypt } from "jose";
import { RtauCard, RtauCardUpdated } from "../type/card";

export async function encryptPayload(
  payload: RtauCard,
  encryptionKey: string,
  encryptionKeyId: string,
): Promise<string> {
  const secretKey = await crypto.subtle.importKey(
    "raw",
    Buffer.from(encryptionKey, "base64"),
    { name: "AES-GCM" },
    false,
    ["encrypt"],
  );

  const encoder = new TextEncoder();
  const encrypted = await new CompactEncrypt(
    encoder.encode(JSON.stringify(payload)),
  )
    .setProtectedHeader({
      alg: "A256GCMKW",
      enc: "A256GCM",
      kid: encryptionKeyId,
    })
    .encrypt(secretKey);

  return encrypted;
}

export async function decryptPayload(
  encryptedPayload: string,
  decryptionKey: string,
  decryptionKeyId: string,
): Promise<RtauCardUpdated> {
  const secretKey = await crypto.subtle.importKey(
    "raw",
    Buffer.from(decryptionKey, "base64"),
    { name: "AES-GCM" },
    false,
    ["decrypt"],
  );

  const { plaintext } = await compactDecrypt(encryptedPayload, secretKey);

  const decoder = new TextDecoder();
  const decryptedPayload = decoder.decode(plaintext);
  const decryptedObject = JSON.parse(decryptedPayload);

  return decryptedObject;
}
