# Loon test client

To submit account inquiries jobs, you need an ActionSuite account.

* Actionsuite API keys ClientKey, PrivateKey
* Pagos Loon public pgp key (used to encrypt content to Pagos)
* Your private pgp key (used to decrypt results from Pagos)

This sample client demonstrates how to submit a job using api keys and pgp encryption.

## Setup

    npm install

copy `.env.example` to `.env` and populate the keys with your credentials

## Submit a job

    node job-submit.js test_cards.csv

Encrypts a test card request file and uploads it to Pagos Loon. See [test_cards.csv](test_cards.csv) for an example.

A jobId is returned, which can be used for status and download calls.

### Sample request file format

The request file should be a csv with the header

`network,account_number,expiry_year,expiry_month,submerchant_account_id`

and at least one row of data with the following values

field | values
------|------
network | visa,mastercard,discover,american express
account_number | 15-16 digits
expiry_year | YYYY
expiry_month | MM
submerchant_account_id | optional value, alphanumeric

## Get Job Status

(Use the job-id returned from submit-job)

    node job-status.js 42

## Get Job Results

When a job is in "processed" state, you can download results as a response file

Use the job-id returned from submit-job

    node job-download.js 42

### Sample response file format

```csv
account_number,expiry_month,expiry_year,new_account_number,new_expiry_month,new_expiry_year,response_indicator,reason_identifier,network
4327390068355737,12,2025,4327390068355714,12,2025,A,,visa
4680056031099386,05,2021,4680056031099386,12,2021,O,,visa
```

