# Active Stories

Active Stories is an application which helps users create and manage user stories. This helps make the process of breaking tasks into manageable user stories easy amd seamless. This is the complete application comprising of the frontend and backend. This app is bootstrapped using [lerna](https://lerna.js.org/).

## Features

the app has the following features:

- A User can:

  - create an account and login.
  - create user stories.
  - view all his/her stories.
  - view details of a story.

- An admin can:
  - stories are automatically marked as pending and can be approved/rejected by any admin
  - approve or reject a story.
  - view all stories on the application.
  - view the details of a story.

## Installation

To run the app locally, setup a local development environment. Ensure that [`Nodejs`](https://nodejs.org/en/download/) and [`PostgreSQL`](https://www.postgresql.org/download/) are installed on your machine.

1. Clone the repository: `git clone git@github.com:Veraclins/active-stories-integrated.git`.
2. Navigate to the project directory: `cd active-stories-integrated`
3. Bootstrap the app and install dependencies: `lerna bootstrap`.
4. Go into both the api (`apps/api`) and frontend (`apps/frontend`) and change .env-example to .env `cp .env.example .env` and fill the variables.
5. Create a postgres database and update .env with the credentials
6. Run `yarn start` to start both apps.
7. Visit [http://localhost:3000](http://localhost:3000). The API can be accessed directly by visiting [http://localhost:4000](http://localhost:4000). Note that the port (4000) can be configured by setting the PORT variable in `apps/api/.env`.

## Testing

To run the tests:

1. Ensure you have run the installation process above.
2. Run `cd apps/api && yarn test`
