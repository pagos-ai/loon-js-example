import forge from "node-forge";

const authorizationScheme = 'V1-HMAC-SHA256';

function computeHash(message, base64key) {
   var key = forge.util.decode64(base64key);
   var hmac = forge.hmac.create();
   hmac.start('sha256', key);
   hmac.update(message);
   return forge.util.encode64(hmac.digest().bytes());
}

function createAuthHeader(clientKey, date, privateKey, bodyJ) {
   var payloadToSign = clientKey + date + bodyJ;

   var computedSignature = computeHash(payloadToSign, privateKey);
   let header = authorizationScheme + ', Signature: ' + computedSignature;
   return header;
};

export function createAuthHeaders(clientKey, privateKey, body, contentType = 'application/json') {
   let date=new Date().toISOString();
   let authHeader = createAuthHeader(clientKey, date, privateKey, body);
   let headers = {
       'X-Client-Key': clientKey,
       'X-Date': date,
       'Authorization': authHeader
   };
   if(contentType != null)
   {
       headers['Content-Type'] = contentType;
   }
   return headers;
}
