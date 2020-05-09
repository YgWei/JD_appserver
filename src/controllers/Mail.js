import { request, summary, tags, responses, body, middlewares, path, query } from 'koa-swagger-decorator' // eslint-disable-line no-unused-vars
import { SUCCESS } from '../constants'
import { sendMail } from '../mail'
import * as schema from '../schema/Mail'
import validator from '../middlewares/validator'
import logger from '../logger/system'
const tag = tags(['Mail']) // eslint-disable-line no-unused-vars

export default class MailController {
  @request('POST', '/mail')
  @summary('Sending an invite mail')
  @tag
  @body(schema.inviteMailBody)
  @middlewares(
    validator(schema.validateInviteMailBody)
  )
  @responses(schema.inviteMailResponses)
  static async inviteMail(ctx) {
    const to = ctx.request.body.email
    const user = ctx.state.user
    try {
      const res = await sendMail(user.name, user.email, to)
      return ctx.res.ok(res, SUCCESS.message)
    } catch (err) {
      logger.error({ message: err.message, err })
      return ctx.res.internalServerError(err.name, err.message)
    }
  }
}
