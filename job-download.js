import fetch from "node-fetch";
import { createAuthHeaders } from './lib/auth.js';
import { loonConfig } from './lib/config.js';
import { decryptPgp }  from './lib/encryption.js';

/** 
 * Download and decrypt the response file for this jobId
 * 
 * @param {object} config object with loon authentication keys
 * @param {object} jobId  the jobId to download
 * @returns {string} decrypted job response
*/
async function downloadJobResponse(config, jobId ) {
    let headers = createAuthHeaders(config.clientKey, config.privateKey, "", "text/plain");
    const response = await fetch(`${config.apiHost}/loon/inquiries/jobs/${jobId}/download`, {
        headers,
        method: 'GET'
    });

    if(response.status == "200") {
        const responseText = await response.text();
        const decrypted = await decryptPgp(responseText, config.privatePgpKey, config.privatePgpKeyPassphrase);
        return decrypted;
    } 
}

(async () => {
    if(process.argv.length != 3) {
        console.log("provide a job id");
        process.exit(1);
    }
    const jobId = process.argv[2]

    let download = await downloadJobResponse(loonConfig, jobId);

    if(download) {
        console.log(download);
    } else {
        console.log("job not found");
    }
})();