'use strict'
import dotenv from 'dotenv'

dotenv.config()

const env = process.env.NODE_ENV || 'development'

const configs = {
  base: {
    logger: {
      fileName: process.env.LOG_FILENAME || 'render',
      directory: process.env.LOG_DIRECTORY || 'logs',
      level: process.env.LOG_LEVEL || 'info'
    },
    google: {
      url: process.env.GOOGLE_URL || '',
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
      redirectUri: process.env.GOOGLE_REDIRECT_URI || ''
    },
    db: {
      dbName: process.env.DATABASE_NAME || '',
      dbUser: process.env.DATABASE_USER || '',
      dbPassword: process.env.DATABASE_PASSWORD || '',
      host: process.env.DATABASE_HOST || '',
      dialect: 'postgres',
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
      }
    },
    mail: {
      userAuth: process.env.AUTH_USER || '',
      passAuth: process.env.AUTH_PASS || ''
    },
    port: process.env.APP_PORT || 8080
  },
  production: {
  },
  development: {
  },
  test: {
  }
}
const config = Object.assign(configs.base, configs[env])

export default config
