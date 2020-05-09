import Joi from '@hapi/joi'

export const inviteMailBody = {
  email: {
    type: 'string',
    required: true
  }
}

export const validateInviteMailBody = {
  body: Joi.object({
    email: Joi.string().required()
  })
}

export const inviteMailResponses = {
  200: {
    description: 'success',
    example: {
      state: 'SUCCESS',
      data: {},
      message: 'success'
    }
  }
}
