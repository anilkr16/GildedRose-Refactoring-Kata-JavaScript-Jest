# Gilded Rose

This is the Gilded Rose kata in JavaScript with Jest

## Getting started

Install dependencies

```sh
npm install
```

## Running tests

To run all tests

```sh
npm test
```

To run all tests in watch mode

```sh
npm run test:watch
```

To generate test coverage report

```sh
npm run test:coverage
```

## Refctored Notes.
* Used Array.map to make the code cleaner by removing the use of item[i] in the update function.
* Extracted every boolean condition into its own explicit variable.
* Simplified the conditional statements/expressions. 
* Consolated all the IF conditions and stored in a explicit variable.
* Seperated the business logic specific to requirements into individual functions.
* Used pure functions wherever possible.
* Added test cases for all the use cases.
* Done.