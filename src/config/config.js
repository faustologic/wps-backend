import dotenv from 'dotenv'

dotenv.config({ silent: true })

const {
  APP_PORT: port = 3000,
  DB_USERNAME: username = 'root',
  DB_PASSWORD: passwordDb = 'example',
  DB_DATABASE: db = 'wps',
  DB_PORT: dbPort = 27017,
} = process.env

const config = {
  app: {
    port,
  },
  db: {
    host: 'localhost',
    user: username,
    password: passwordDb,
    database: db, 
    port: dbPort
  },
}

export default config
