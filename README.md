# wps-backend
Backend server for a landing page World Platform Soccer.

Take into account the configuration of this repository, if you require a local execution you must install `mongo 4.2` and `node >= 12`.

You also have the option to run the project with `docker-compose` for which you must have the most recent versions of `docker` and `docker-compose`

## Settings

You must copy the `.env.example` to ` .env` in the root of the project

* `NODE_ENV` = you can use `local`,` development` or `production`
* `APP_PORT` = set the port on which you want to run the app, by default `3000`.
* `DB_USERNAME` = replicate the values of `MONGO_INITDB_ROOT_USERNAME` or leave them empty if you are in` local` environment.
* `DB_PASSWORD` = replicate the values of `MONGO_INITDB_ROOT_PASSWORD` or leave them empty if you are in` local` environment.
* `DB_DATABASE` = replicate the values of `MONGO_INITDB_DATABASE` or leave them empty if you are in` local` environment.
* `DB_HOSTNAME` = index the name of the database service, by default, `db`.
* `DB_PORT` = if the environment is `local` leave it empty, otherwise indicate the port to which you want to connect, by default` 4000`.

If you are using docker, keep in mind that you must set the following values, otherwise you can leave them empty

* `MONGO_INITDB_ROOT_USERNAME` = specify the database administrator username
* `MONGO_INITDB_ROOT_PASSWORD` = indicate the user's password to access the database.
* `MONGO_INITDB_DATABASE` = specify the name of the database.

## Run Project

* Install the dependencies using `yarn install` in the root of the project.
* Run `yarn start` to run the project locally.
* Run `yarn run dev` to work in development mode.

  ### Run with docker

  * Run `docker-compose up -d` to start the application.
  * Run `docker-compose logs -f` to view the application's` logs`.
  * Run `docker-compose down` to drop the containers, keep in mind that the database has a volume to persist the data, if you want to delete all the data at the time of taking down the containers run` docker-compose down -v` .

