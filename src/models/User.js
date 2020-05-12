import { Sequelize } from 'sequelize'
import { db } from '../connection'

export const User = db.define('User', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  full_name: {
    allowNull: false,
    type: Sequelize.STRING
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
    defaultValue: 'Active',
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
