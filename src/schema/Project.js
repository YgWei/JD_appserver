import Joi from '@hapi/joi'

export const getProjectResponses = {
  200: {
    description: 'success',
    example: {
      state: 'SUCCESS',
      data: {},
      message: 'success'
    }
  }
}

export const validateFindProject = {
  params: Joi.object({
    id: Joi.string().required()
  })
}

export const getProjectByIdResponses = {
  200: {
    description: 'success',
    example: {
      state: 'SUCCESS',
      data: {},
      message: 'success'
    }
  }
}

export const createProjectBody = {
  projectName: {
    type: 'string',
    required: true
  },
  projectDescription: {
    type: 'string',
    required: true
  }
}

export const validateProjectBody = {
  body: Joi.object({
    projectName: Joi.string().required(),
    projectDescription: Joi.string().required()
  })
}

export const createProjectResponses = {
  200: {
    description: 'success',
    example: {
      state: 'SUCCESS',
      data: {},
      message: 'success'
    }
  }
}
