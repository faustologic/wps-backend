import mongoose from 'mongoose'
import config from '../config/config'
const { NODE_ENV, DB_HOSTNAME } = process.env
var dbConnectionSingletonPromise
const getDatabaseConnection = () => {
  if (dbConnectionSingletonPromise) {
    return dbConnectionSingletonPromise
  }
  
  if (NODE_ENV === 'local') {
    const url = `mongodb://${config.db.host}:${config.db.port}/${config.db.database}`
    dbConnectionSingletonPromise = mongoose.connect(url, {
      useCreateIndex: true,
      useFindAndModify: false,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
  } else {
    const url = `mongodb://${DB_HOSTNAME}/${config.db.database}?authsource=admin`
    dbConnectionSingletonPromise = mongoose.connect(url, {
      auth: { user: config.db.user, password: config.db.password },
      useCreateIndex: true,
      useFindAndModify: false,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
  }
  mongoose.connection.on('connected', () => {
    console.log(
      `[Mongoose]: connection open to ${config.db.host}/${config.db.database}`,
    )
  })
  mongoose.connection.on('error', (e) => {
    console.log(`[Mongoose]: connection error: ${e}`)
  })
  mongoose.connection.on('disconnected', () => {
    console.log('[Mongoose]: connection disconnected')
  })
  return dbConnectionSingletonPromise
}

export { getDatabaseConnection }
