import { Sequelize } from 'sequelize'
import { db } from '../connection'

export const Project = db.define('Project', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  projectName: {
    allowNull: false,
    unique: true,
    type: Sequelize.STRING
  },
  projectDescription: {
    allowNull: false,
    type: Sequelize.Sequelize.TEXT
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

Project.sync()
