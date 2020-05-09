'use strict'
import { SwaggerRouter } from 'koa-swagger-decorator'
import LoginController from '../../controllers/Login'
import UserController from '../../controllers/User'
import ProjectController from '../../controllers/Project'
import MailController from '../../controllers/Mail'

const router = new SwaggerRouter()

router.swagger({
  title: 'Service API doc',
  description: 'Service API doc',
  version: 'v1.0.0',

  // [optional] default is root path.
  prefix: '/api/v1',

  // [optional] default is /swagger-html
  swaggerHtmlEndpoint: '/swagger-html',

  // [optional] default is /swagger-json
  swaggerJsonEndpoint: '/swagger-json',

  // [optional] additional options for building swagger doc
  // eg. add api_key as shown below
  swaggerOptions: {
    securityDefinitions: {
      ApiKeyAuth: {
        type: 'apiKey',
        in: 'header',
        name: 'Authorization'
      }
    }
  }
})

router.map(LoginController, { doValidation: false })
router.map(UserController, { doValidation: false })
router.map(ProjectController, { doValidation: false })
router.map(MailController, { doValidation: true })

export default router
