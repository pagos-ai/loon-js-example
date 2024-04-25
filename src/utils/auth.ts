import forge from "node-forge";

const authorizationScheme = "V1-HMAC-SHA256";

export function createHeaders(
  clientKey: string,
  privateKey: string,
  body: string,
  contentType = "application/json",
) {
  const date = new Date().toISOString();
  const authHeader = createAuthHeader(clientKey, date, privateKey, body);
  const headers = {
    "X-Client-Key": clientKey,
    "X-Date": date,
    Authorization: authHeader,
  };
  if (contentType != null) {
    headers["Content-Type"] = contentType;
  }
  return headers;
}

function computeHash(message: string, base64key: string): string {
  const key = forge.util.decode64(base64key);
  const hmac = forge.hmac.create();
  hmac.start("sha256", key);
  hmac.update(message);
  return forge.util.encode64(hmac.digest().bytes());
}

function createAuthHeader(
  clientKey: string,
  date: string,
  privateKey: string,
  body: string,
) {
  const payloadToSign = clientKey + date + body;
  const computedSignature = computeHash(payloadToSign, privateKey);
  const header = authorizationScheme + ", Signature: " + computedSignature;

  return header;
}
