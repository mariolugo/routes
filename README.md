## Getting Started

First, install libraries (I was using Node 12.18.0):

```bash
yarn
```

Then, run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

To run the tests:

```bash
yarn test
```

To run the test coverage

```bash
yarn test:coverage
```

## Workflow

The branching model used is gitflow, this helps a lot with collaboration and scaling the development team.

### master

deployments to production

### develop

Developtment branch.

### feature/initial_setup

Creating the initial setup, installing libraries, adding a precommiter, eslint and prettier

### feature/layout

Creating the base layout with `react-bootstrap` and adding google maps component with routes.

### feature/redux

Adding redux functionality, immutability and redux sagas.

## Styling

Used `eslint`,it is going to tell you if you’ve imported something and not used it, if your function could be short-handed, and loads of other little gotchas that you can fully configure.

Used `prettier`, it is an opinionated code formatter, this will assure that the code styling is the same.

## Libraries Used

These are ones of the major libraries I used to accomplish this test.

### Next.js

Use to use SSR (server side rendering features), this can improve the SEO.

### React-bootstrap

I used `react-bootstrap`\ to use components instead of classes (Bulma).

### husky

precommit, ensure same slyting and no javascript errors before commit

### eslint

linter tool to find and fix problems in javascript code.

### prettier

to share the same code styling

### PropTypes

Used for component documentaiton

### Redux/Redux-Saga

State management and midleware for side effects

### Axios

Promise based HTTP client

## Redux Pattern

I used a redux modular pattern called [Ducks](https://github.com/erikras/ducks-modular-redux), that collocates actions, action types and reducers.
I used the saga middleware and an api object, this can be used to handle all the HTTP methods in one place. Also, you can add headers and tokens to that api, and it will be automatically used on all the future sagas.

## Google Maps

I have not used a map library. I think you can have a better control of the map if you are not using a library. I'm importing on `src/pages/_app.js` the script tag with the google maps url.
