# End to end tests for backend apis

This project contains tests you can run but they DO have I/O. They are not unit tests. They are end to end tests.

To run the tests, you need to have a running backend.

## Running the tests

To run a test use `pnpm run test:e <test-file-name-pattern>`

e.g. `pnpm run test:e emailClient`

## Note on test data

Some tests try to clean up the database completely after themselves.

This means each test run creates a new user or set of users. Auth0 limits the calls to their /userinfo endpoint to 5 every minute for one user. So you cannot run the suite of tests without hitting this limit.

Run the tests one at a time or in small batches.
