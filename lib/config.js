import dotenv from "dotenv";

dotenv.config()

export const loonConfig = {
   clientKey: process.env.CLIENT_KEY,
   privateKey: process.env.PRIVATE_KEY,
   apiHost: process.env.API_HOST,
   pagosPublicPgpKey: process.env.PAGOS_PUBLIC_PGP_KEY,
   privatePgpKey: process.env.PRIVATE_PGP_KEY
}

if(!loonConfig.clientKey || 
   !loonConfig.privateKey || 
   !loonConfig.apiHost || 
   !loonConfig.privatePgpKey || 
   !loonConfig.pagosPublicPgpKey) {
    console.log("please set CLIENT_KEY, PRIVATE_KEY, PAGOS_PUBLIC_PGP_KEY, PRIVATE_PGP_KEY and API_HOST as environment vars");
    process.exit();
}