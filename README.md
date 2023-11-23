# Thrindle-test

## Features
- User authenticatiom -sign up, login
- User authorization - middleware
- Dynamic bank transfer - payment to a temporary account number
- Bank transfer - transfer funds to other banks accounts directly from the app
- Robust error handling

## Archtecture
The codebase is structured by components, with each component having it's own logic and data access(services in this case), and business modules.
Vastly reduces great chnaces of a tightly coupled 'spaghetti' system.

Object Oriented Programming is mainly used.

## Running the app
To run the app, you need to first install relevant dependencies:
```
npm install
```

## Starting the app
There are 2 start commands:
  - start the server on development environment using nodemon ```npm run dev-start```
  - starting on a staging/production environment ```npm run start```

## Testing
Tests were written using jest. Simply for the purpose of demonstrating writing unit tests in express.js, so they are minimal.
