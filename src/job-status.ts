import fetch from "node-fetch";
import { createHeaders } from "./utils/auth.js";
import { loonConfig } from "./utils/config.js";

/**
 * Prints out the status of a given jobId
 *
 * @param {object} config object with loon authentication keys
 * @param {number} jobId the jobId to check the status for
 */
async function printJobStatus(config, jobId) {
  const headers = createHeaders(
    config.clientKey,
    config.privateKey,
    "",
    "text/plain",
  );
  const response = await fetch(
    `${config.apiHost}/loon/inquiries/jobs/${jobId}`,
    {
      headers,
      method: "GET",
    },
  );

  if (response.status == 200) {
    const responseJson = await response.json();
    console.log(responseJson);
  } else {
    console.log("job not found");
  }
}

(async () => {
  if (process.argv.length != 3) {
    console.log("provide a job id");
    process.exit(1);
  }

  const jobId = process.argv[2];
  await printJobStatus(loonConfig, jobId);
})();
