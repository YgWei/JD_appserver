import Joi from '@hapi/joi'

export const findUserResponses = {
  200: {
    description: 'success',
    example: {
      state: 'SUCCESS',
      data: {},
      message: 'success'
    }
  }
}

export const validateGetUserByUuid = {
  params: Joi.object({
    id: Joi.string().required()
  })
}

export const getUserByUuidResponses = {
  200: {
    description: 'success',
    example: {
      state: 'SUCCESS',
      data: {},
      message: 'success'
    }
  }
}

export const createUserBody = {
  name: {
    type: 'string',
    required: true
  },
  email: {
    type: 'string',
    required: true
  }
}

export const validateUserBody = {
  body: Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required()
  })
}

export const createUserResponses = {
  200: {
    description: 'success',
    example: {
      state: 'SUCCESS',
      data: {},
      message: 'success'
    }
  }
}

export const UpdateUserBody = {
  first_name: {
    type: 'string',
    required: true
  },
  last_name: {
    type: 'string',
    required: true
  },
  email: {
    type: 'string',
    required: true
  }
}

export const validateUpdateUserBody = {
  params: Joi.object({
    id: Joi.string().required()
  }),
  body: Joi.object({
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    email: Joi.string().required()
  })
}

export const updateUserResponses = {
  200: {
    description: 'success',
    example: {
      state: 'SUCCESS',
      data: {},
      message: 'success'
    }
  }
}

export const validateDeleteUser = {
  params: Joi.object({
    id: Joi.string().required()
  })
}

export const deleteUserResponses = {
  200: {
    description: 'success',
    example: {
      state: 'SUCCESS',
      data: {},
      message: 'success'
    }
  }
}
