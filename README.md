# Loon test client

To submit account inquiries jobs, you need an ActionSuite account.

* Actionsuite API keys ClientKey, PrivateKey
* Pagos Loon public pgp key (used to encrypt content to Pagos)
* Your private pgp key (used to decrypt results from Pagos)

This sample client demonstrates how to submit a job using api keys and pgp encryption.

## Setup

    npm install

copy `sample.env` to `.env` and populate the keys with the above credentials

As of writing, this sample was tested with node v14.21.1 and npm v9.2.0

## Submit a job

    node job-submit.js test_cards.csv

Encrypts a test card request file and uploads it to Pagos Loon. The format is defined in `test_cards.csv`.

A jobId is returned, which can be used for the next two calls.

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

