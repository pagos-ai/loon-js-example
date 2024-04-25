import dotenv from "dotenv";
import { LoonConfig } from "./type/service";

dotenv.config();

export const loonConfig = {
  clientKey: process.env.CLIENT_KEY,
  privateKey: process.env.PRIVATE_KEY,
  apiHost: process.env.API_HOST,
  pagosPublicPgpKey: process.env.PAGOS_PUBLIC_PGP_KEY,
  privatePgpKey: process.env.PRIVATE_PGP_KEY,
  privatePgpKeyPassphrase: process.env.PRIVATE_PGP_KEY_PASSPHRASE,
  requestKey: process.env.REQUEST_KEY,
  requestKeyId: process.env.REQUEST_KEY_ID,
  responseKey: process.env.RESPONSE_KEY,
  responseKeyId: process.env.RESPONSE_KEY_ID,
} as LoonConfig;

if (
  !loonConfig.clientKey ||
  !loonConfig.privateKey ||
  !loonConfig.apiHost ||
  !loonConfig.privatePgpKey ||
  !loonConfig.pagosPublicPgpKey ||
  !loonConfig.requestKey ||
  !loonConfig.requestKeyId ||
  !loonConfig.responseKey ||
  !loonConfig.responseKeyId
) {
  console.log(
    "please set REQUEST_KEY, REQUEST_KEY_ID, RESPONSE_KEY, RESPONSE_KEY_ID, CLIENT_KEY, PRIVATE_KEY, PAGOS_PUBLIC_PGP_KEY, PRIVATE_PGP_KEY and API_HOST as environment vars",
  );
  process.exit();
}
