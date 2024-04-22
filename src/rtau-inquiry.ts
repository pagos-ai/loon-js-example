import fetch from "node-fetch";
import { v4 as uuidv4 } from "uuid";
import { createHeaders } from "./lib/encryption/auth";
import { decryptPayload, encryptPayload } from "./lib/encryption/jwt";
import { loonConfig } from "./lib/config";
import { LoonConfig } from "./lib/type/service";
import { RtauPayload, RtauResponse } from "./lib/type/card";
import { card } from "./data/card";

/**
 * Sends encrypted RTAU inquiry
 *
 * @param config - object with loon authentication keys
 * @param payload - the payload to be sent
 */
async function rtauInquiry(
  config: LoonConfig,
  payload: RtauPayload,
): Promise<RtauResponse> {
  const url = `${config.apiHost}/loon/rtau/inquiry`;
  const body = JSON.stringify(payload, null, 2);
  const headers = createHeaders(
    config.clientKey,
    config.privateKey,
    body,
    "application/json",
  );
  const response = await fetch(url, {
    headers,
    method: "POST",
    body,
  });

  if (response.status == 200) {
    const responseJson = (await response.json()) as RtauResponse;
    console.log(
      `Inquiry performed successfully, encoded response - ${JSON.stringify(responseJson)}`,
    );
    return responseJson;
  } else {
    throw `Inquiry issue, code - ${response.status} ${response.statusText}`;
  }
}

(async () => {
  const payload: RtauPayload = {
    network: "visa",
    requestId: uuidv4(),
    accountEncrypted: await encryptPayload(
      card,
      loonConfig.requestKey,
      loonConfig.requestKeyId,
    ),
    subMerchantId: null,
  };

  const response = await rtauInquiry(loonConfig, payload);
  const account = await decryptPayload(
    response.accountEncrypted,
    loonConfig.responseKey,
    loonConfig.responseKeyId,
  );

  console.log(`\nAccount decrypted successfully: ${JSON.stringify(account)}`);
})();
