import http from 'http'
import { app } from './app'
import config from './config/config'
import { getDatabaseConnection } from './db/index'
import { handleFatalError } from './utils/handleError'

process.on('uncaughtException', handleFatalError)
process.on('unhandledRejection', handleFatalError)

getDatabaseConnection()
  .then(() => {
    http.createServer(app).listen(config.app.port, () => {
      console.log(`\u{1F525} App listening on port ${config.app.port}`)
    })
  })
  .catch((err) => {
    console.log(err)
    throw new Error('PROBLEM_IN_DB')
  })
