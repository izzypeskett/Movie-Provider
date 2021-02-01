# Princes Theatre: Lexicon Digital Coding Challenge
*Applicant: Isabelle Peskett*

## Brief
 To build an application to allow a user to see which movie provider is streaming a movie at a cheaper price.
 ### Problem point
 The API sharing the movie catalogue is unstable.
***

## Specs
```
node v15.3.0
npm v7.0.14

Run application in either 
- Google Chrome
- Firefox
```

 ## Setup

 Clone this repository  

 The application consists of a server and a front-end. Both need to be running.  

 To run the server:
 ```
 cd server
 npm install

 // You will need a .env file at the root of the server folder that contains:
 API_URL=https://challenge.lexicondigital.com.au/api/
 API_KEY=Yr2636E6BTD3UCdleMkf7UEdqKnd9n361TQL9An7
 
 npm run dev
 // The server will be running at localhost:5000
 ```

 To run the frontend:
 ```
cd client
npm install

// You will need a .env.local file at the root of the client folder that contains:
REACT_APP_API_URL = 'http://localhost:5000'


npm run start
// The server will be running at localhost:3000
```
***
 ## Testing
 #### Server tests:
Unit & API testing was done using Chai, Mocha and Supertest
 ```
 cd server
 npm install (if not already done so)
 npm run test-dev
 ```
#### Client tests:
Unit & integration testing was done using Jest & react-testing-library and end-to-end testing was done using cypress
```
cd server
npm install (if not already done so)
npm run test 
// or
npm run test -- --coverage

// To run cypress test
npm run cypress:all //Command line report

// or
npm run cypress //open the cypress UI
```
***
## Architecture
This application has three components
1. Third-party movie API
2. Backend for frontend (server) written in **Typescript & Express**
3. Frontend written in **React**

### Reasoning
I have mostly been working with Typescript, Angular and Express for the last 9 months and was comfortable with initating my application using some of these languages.  
I didn't want my frontend application to be having to manage tricky and unstable API calls, the focus for the frontend was pure UI. That is why I decided to create a backend for frontend layer to handle the API/data logic.  

I chose React as the frontend framework , although I haven't worked with React in over 9 months I wanted to challenge myself and use a language I know Lexicon works with. 
## Approach

### Steps
* Explored movie API using Postman to discover the errors and the structure of the data-sets
* Built the backend for frontend to handle the errors and manipulate the data to be in an easier to use format for the frontend
* Wrote unit & API tests for backend
* Built the skeleton of the frontend and connected it to the server
* Split frontend application into pages & components
* Used custom sass/scss styles for frontend application following BEM (Block Element Modifier) principles
* Wrote unit & integration tests for frontend
* Wrote e2e test for frontend

### Difficult Points
* I knew quite quickly how I wanted to solve the bad-gateway error the movie API was returning
  * When the API returned a bad-gateway error (status > 500) I wanted my application to make another axios call after a set time delay
  * I did not posses the technical knowledge to know how to execute this solution
  * I found a solution online [here](https://github.com/axios/axios/issues/164) that fit my thinking that used an axios intercepter - to intercept the function before it went into the catch block and retry the GET call if the retry attempts were no greater than what was set in the configuration

* Testing
  * I have not had extensive experience or exposure to testing especially with React, testing the axios requests to the server was the most difficult and I implemented a mock occurence of the axios call.

* Time
  * A trade-off was to not focus on deployment - an area I would like to gain more experience in, however within the time-frame I decided to focus on the problem-solving aspect of the challenge and the core code that needed to be built.

### Learnings
This challenge was incredibly fun with so many different approaches that could have been taken. An extended or another attempt I would have added or updated the following things:
* Implement redux into the frontend to store the data - that way the API does not need to be continually called.
* Improve the structure of the React application to keep code consistent and clean.
* Adding in type checking to the React application - after working with Typescript I see the beauty in typechecking to minimise any runtime errors and to explicitly highlight to other developers the type of response you are expecting.
* Add more tests - testing all components and end to end flows.
