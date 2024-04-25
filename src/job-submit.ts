import fetch from "node-fetch";
import { readFileSync } from "fs";
import { createHeaders } from "./utils/auth.js";
import { loonConfig } from "./utils/config.js";
import { encryptPgp } from "./utils/encryption/pgp.js";

/**
 * Encrypt and upload a card file
 *
 * @param {object} config object with loon authentication keys
 * @param {string} cards csv formatted list of cards to inquire
 * @returns {number} jobId
 */
async function submitJob(config, cards) {
  const body = await encryptPgp(cards, config.pagosPublicPgpKey);

  const headers = createHeaders(
    config.clientKey,
    config.privateKey,
    body,
    "text/plain",
  );

  const response = await fetch(`${config.apiHost}/loon/inquiries/jobs`, {
    headers,
    method: "POST",
    body,
  });

  const responseJson = (await response.json()) as { jobId: number };

  if (response.status == 200) {
    console.log("jobId submitted", responseJson.jobId);
  } else {
    console.log("job submit failed {0} {1}", response.status, responseJson);
  }
}

function getCardsAsCsv(fileName) {
  return readFileSync(fileName).toString();
}

(async () => {
  if (process.argv.length != 3) {
    console.log("provide a csv file name with cards");
    process.exit(1);
  }

  const fileName = process.argv[2];

  const cards = getCardsAsCsv(fileName);
  await submitJob(loonConfig, cards);
})();
