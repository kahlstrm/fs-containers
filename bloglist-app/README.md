# Bloglist

This is a containerized full stack application with 100% Typescript using Redux in the front-end for state-management and Sequelize with a heroku deployed PostgreSQL-database for the backend.

## Requirements

For production builds, you only need [Docker](https://docs.docker.com/get-docker/) And a Postgres-database from e.g. [Railway](https://railway.app/) or [Heroku](https://devcenter.heroku.com/articles/heroku-postgresql).

For development, `npm` is also needed for installing packages.

## Development

Make a `.env` file from .env.example and fill in the variables.

After cloning run `npm install` inside both `bloglist-frontend` and `bloglist-backend`

After that in `bloglist-app` folder:

    docker-compose -f docker-compose.dev.yml up

Now both are up and running on `localhost:8080` with the backend being bound to /api

## Production

Inside the `bloglist-app` folder (no npm necessary):

    docker-compose up

Now the whole app is running on `localhost`
