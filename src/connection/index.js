import Sequelize from 'sequelize'
import config from '../config'

export const db = new Sequelize(config.db.dbName, config.db.dbUser, config.db.dbPassword, {
  host: config.db.host,
  dialect: config.db.dialect,

  pool: config.db.pool
})
