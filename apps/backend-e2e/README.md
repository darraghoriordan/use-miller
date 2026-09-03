# End to end tests for backend apis

This project contains tests you can run, but they do have I/O. They are not unit tests. They are end to end tests.

To run the tests, you need to have a running backend.

## Running the tests

To run a test use `pnpm run test:e <test-file-name-pattern>`

e.g. `pnpm run test:e emailClient`

## Note on test data

Some tests try to clean up the database completely after themselves.

The test harness uses signed bearer tokens for two Google-authenticated accounts so API
clients exercise the same transport available to browser SPAs and streaming requests. Put
the owner and member tokens in the ignored `.env` using the names from `.env.template`.

Run the tests one at a time or in small batches.
