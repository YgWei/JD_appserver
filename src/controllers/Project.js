import { request, summary, tags, responses, body, middlewares, path, query } from 'koa-swagger-decorator' // eslint-disable-line no-unused-vars
import { Project } from '../models/Project'
import { SUCCESS } from '../constants'
import * as schema from '../schema/Project'
import validator from '../middlewares/validator'
import logger from '../logger/system'
const tag = tags(['Project']) // eslint-disable-line no-unused-vars

export default class ProjectController {
  @request('GET', '/project')
  @summary('Get project')
  @tag
  @responses(schema.getProjectResponses)
  static async findProject(ctx) {
    try {
      const res = await Project.findAll()
      return ctx.res.ok(res, SUCCESS.message)
    } catch (err) {
      logger.error({ message: err.message, err })
      return ctx.res.internalServerError(err.name, err.message)
    }
  }

  @request('GET', '/project/{id}')
  @summary('Get project by uuid')
  @tag
  @path({
    id: { type: 'string', required: true }
  })
  @middlewares([
    validator(schema.validateFindProject)
  ])
  @responses(schema.getProjectByIdResponses)
  static async getProjectByUuid(ctx) {
    const id = ctx.params.id
    const data = await Project.findOne({
      where: {
        id
      }
    })
    return ctx.res.ok(data, SUCCESS.message)
  }

  @request('POST', '/project')
  @summary('create a project')
  @tag
  @body(schema.createProjectBody)
  @middlewares(
    validator(schema.validateProjectBody)
  )
  @responses(schema.createProjectResponses)
  static async createProject(ctx) {
    const projectName = ctx.request.body.projectName
    const projectDescription = ctx.request.body.projectDescription
    try {
      const res = await Project.create({ projectName, projectDescription })
      return ctx.res.ok(res, SUCCESS.message)
    } catch (err) {
      logger.error({ message: err.message, err })
      return ctx.res.internalServerError(err.name, err.message)
    }
  }
}
