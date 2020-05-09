import { request, summary, tags, responses, body, middlewares } from 'koa-swagger-decorator' // eslint-disable-line no-unused-vars
// import validate from '../middlewares/validate'
import * as schema from '../schema/Login'
import LoginService from '../services/Login'
import logger from '../logger/system'
import validator from '../middlewares/validator'
// import authorization from '../middlewares/authorization'
// import { Authorization } from '../constants'
const tag = tags(['Login']) // eslint-disable-line no-unused-vars

export default class LoginController {
  @request('post', '/login')
  @body({
    account: { type: 'string', require: true },
    password: { type: 'string', require: true }
  })
  @summary('login')
  @middlewares(
    validator(schema.loginValidation)
  )
  @tag
  @responses(schema.loginResponses)
  static async login(ctx) {
    const loginService = new LoginService()
    const body = ctx.request.body
    try {
      const token = await loginService.login(body)
      return ctx.res.ok({ jwt: token }, 'success')
    } catch (err) {
      logger.error({ message: err.message, data: body, err })
      return ctx.res.forbidden(err.name, 'Login fail.', 'Login fail.')
    }
  }

  @request('post', '/login/google')
  @body({
    code: { type: 'string', require: true },
    mode: { type: 'string', require: true }
  })
  @summary('Google Oauth')
  @middlewares(
    // validator(schema.loginValidate)
  )
  @tag
  @responses(schema.loginResponses)
  static async loginGoogle(ctx) {
    const loginService = new LoginService()
    const code = ctx.request.body.code
    const mode = ctx.request.body.mode
    console.log('code and mode', code, mode)
    try {
      const token = await loginService.loginGoogle(code, mode)
      return ctx.res.ok({ jwt: token }, 'success')
    } catch (err) {
      logger.error({ message: err.message, data: body, err })
      return ctx.res.forbidden(err.name, 'Login fail.', { message: err.message })
    }
  }
}
