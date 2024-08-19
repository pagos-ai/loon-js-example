# Loon test client

To submit account inquiries jobs, you need an ActionSuite account.

- Actionsuite API keys ClientKey, PrivateKey
- Pagos Loon public pgp key (used to encrypt content to Pagos)
- Your private pgp key and passphrase (used to decrypt results from Pagos)
- RTAU requestKey, requestKeyId, responseKey and responseKeyId for using RTAU feature

This sample client demonstrates how to submit a job using api keys and pgp encryption.

## Setup

    npm install

for tsx (Typescript execution tool) usage install it globally with `npm install -G tsx` or add `npx` to `tsx` for local execution

copy `.env.example` to `.env` and populate the keys with your credentials. if you don't have some of credentials for batch or RTAU, just leave original place holder string.

## Environments

| Environment | API_HOST                              | Response cadence                     |
| ----------- | ------------------------------------- | ------------------------------------ |
| sandbox     | https://services.sandbox.pagosapi.com | Near real time (simulated responses) |
| prod        | https://services.prod.pagosapi.com    | Overnight                            |

## Submit a job

    tsx src/job-submit.js src/data/test_cards.csv

Encrypts a test card request file and uploads it to Pagos Loon. See [test_cards.csv](src/data/test_cards.csv) for an example.

A jobId is returned, which can be used for status and download calls.

### Sample request file format

The request file should be a csv with the header

`network,account_number,expiry_year,expiry_month,sub_merchant_id,metadata`

and at least one row of data with the following values

| field                  | values                                                                                                             |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------ |
| network                | visa,mastercard,discover,american express                                                                          |
| account_number         | 13-19 digits                                                                                                       |
| expiry_year            | YYYY                                                                                                               |
| expiry_month           | MM                                                                                                                 |
| submerchant_account_id | optional, alphanumeric, max 12 characters for visa/discover/american express, exactly 15 characters for mastercard |
| metadata               | optional, alphanumeric, max 50 characters                                                                          |

## Get Job Status

(Use the job-id returned from submit-job)

    tsx src/job-status.ts 42

A status object is returned

### Processing

Your job is being processed

```
tsx src/job-status.ts 42

{
  status: 'processing',
  error: null,
  networks: [
    { network: 'visa', status: 'pending' },
    { network: 'mastercard', status: 'pending' }
  ]
}
```

### Errors

Your input file has errors

```
tsx src/job-status.ts 42

{
  status: 'error',
  error: {
    code: 'validation_failed',
    message: 'The file failed to validate. See Details for details.',
    details: [
      {
        detail: 'AccountNumber',
        additionalInfo: 'Row = 1, Value = 1234'
      }, ...
    ]
  }
}
```

### Processed

Your file has been processed. You can proceed and download results.

```
tsx src/job-status.ts 42

{
  status: 'processed',
  error: null,
  networks: [
    { network: 'mastercard', status: 'processed' },
    { network: 'visa', status: 'processed' }
  ]
}
```

## Get Job Results

When a job is in "processed" state, you can download results as a response file

Use the job-id returned from submit-job

```
tsx src/job-download.ts 42
```

### Sample response file format

```csv
account_number,expiry_month,expiry_year,new_account_number,new_expiry_month,new_expiry_year,response_code,error_code,network,sub_merchant_id,metadata
4025000000001002,12,2023,4025000000001102,,,LAE,,visa,1,31a7bf30-8ea6-429e-9522-6b6099040530
5412000000001004,12,2023,,,,LCA,,mastercard,2,51032475-bc83-46d8-8768-15e129f3c6e0
```

Refer to the [Loon Test Values](https://docs.pagos.ai/docs/loon-testing#loon-test-values) for a complete list of response codes.

## Real Time Account Updater (RTAU) inquiry

For using RTAU feature, you may find this file
Edit `src/data/card.ts` to change card, expiration date and metadata

    tsx src/rtau-inquiry.ts

Execution of this script will return you original response and decryption of updated card
