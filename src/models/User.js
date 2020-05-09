import { Sequelize } from 'sequelize'
import { db } from '../connection'

export const User = db.define('User', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  first_name: {
    allowNull: false,
    type: Sequelize.STRING
  },
  last_name: {
    type: Sequelize.STRING
  },
  email: {
    allowNull: false,
    unique: true,
    type: Sequelize.STRING
  },
  status: {
    allowNull: false,
    type: Sequelize.STRING
  },
  createdAt: {
    allowNull: false,
    type: Sequelize.DATE
  },
  updatedAt: {
    allowNull: false,
    type: Sequelize.DATE
  }
})

User.sync()
