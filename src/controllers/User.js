import { request, summary, tags, responses, body, middlewares, path, query } from 'koa-swagger-decorator' // eslint-disable-line no-unused-vars
import { User } from '../models/User'
import { SUCCESS } from '../constants'
import * as schema from '../schema/User'
import validator from '../middlewares/validator'
import logger from '../logger/system'

const tag = tags(['User']) // eslint-disable-line no-unused-vars

export default class UserController {
  @request('GET', '/user')
  @summary('Get users')
  @query({
    status: { type: 'string', required: true, default: 'All' }
  })
  @tag
  @middlewares(
  )
  @responses(schema.findUserResponses)
  static async findUser(ctx) {
    const status = ctx.query.status
    try {
      let res
      if (status === 'All') {
        res = await User.findAll()
      } else {
        res = await User.findAll({
          where: {
            status
          }
        })
      }
      return ctx.res.ok(res, SUCCESS.message)
    } catch (err) {
      logger.error({ message: err.message, err })
      return ctx.res.internalServerError(err.name, err.message)
    }
  }

  @request('GET', '/userinfo')
  @summary('Get User Info based on token')
  @tag
  @responses(schema.findUserResponses)
  static async getUserInfo(ctx) {
    console.log(ctx.state.user)
    const user = ctx.state.user
    console.log(user)
    try {
      const userInfo = await User.findOne({
        where: {
          email: user.email
        }
      })
      return ctx.res.ok(userInfo, SUCCESS.message)
    } catch (err) {
      logger.error({ message: err.message, err })
      return ctx.res.internalServerError(err.name, err.message)
    }
  }

  @request('GET', '/user/{id}')
  @summary('Get users')
  @path({
    id: { type: 'string', required: true }
  })
  @tag
  @middlewares(validator(schema.validateGetUserByUuid))
  @responses(schema.getUserByUuidResponses)
  static async findUserById(ctx) {
    const id = ctx.params.id
    try {
      const res = await User.findOne({
        where: {
          id
        }
      })
      return ctx.res.ok(res, SUCCESS.message)
    } catch (err) {
      logger.error({ message: err.message, err })
      return ctx.res.internalServerError(err.name, err.message)
    }
  }

  @request('POST', '/user')
  @summary('Create an user')
  @body(schema.createUserBody)
  @tag
  @middlewares(
    validator(schema.validateUserBody)
  )
  @responses(schema.createUserResponses)
  static async createUser(ctx) {
    const name = ctx.request.body.name
    const email = ctx.request.body.email
    try {
      const res = await User.create({ name, email })
      return ctx.res.ok(res, SUCCESS.message)
    } catch (err) {
      logger.error({ message: err.message, err })
      return ctx.res.internalServerError(err.name, err.message)
    }
  }

  @request('PUT', '/user/{id}')
  @summary('Update an user')
  @tag
  @path({
    id: { type: 'string', required: true }
  })
  @body(schema.UpdateUserBody)
  @middlewares(
    validator(schema.validateUpdateUserBody)
  )
  @responses(schema.updateUserResponses)
  static async updateUser(ctx) {
    console.log(ctx.request)
    const id = ctx.params.id
    const name = ctx.request.body.name
    const email = ctx.request.body.email
    try {
      const res = await User.update({ name, email }, {
        where: {
          id
        }
      })
      return ctx.res.ok(res, SUCCESS.message)
    } catch (err) {
      logger.error({ message: err.message, err })
      return ctx.res.internalServerError(err.name, err.message)
    }
  }

  @request('DELETE', '/user/{id}')
  @summary('Change status to inactive')
  @tag
  @path({
    id: { type: 'string', required: true }
  })
  @middlewares(
    validator(schema.validateDeleteUser)
  )
  @responses(schema.deleteUserResponses)
  static async deleteUser(ctx) {
    console.log(ctx.params)
    const id = ctx.params.id
    try {
      const res = await User.update({ status: 'Inactive' }, {
        where: {
          id
        }
      })
      return ctx.res.ok(res, SUCCESS.message)
    } catch (err) {
      logger.error({ message: err.message, err })
      return ctx.res.internalServerError(err.name, err.message)
    }
  }
}
