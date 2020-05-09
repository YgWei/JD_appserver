'use strict'
import Koa from 'koa'
import routers from './routers'
import bodyParser from 'koa-bodyparser'
import cors from 'kcors'
import requestID from './middlewares/requestID'
import httpLogger from './middlewares/logger'
import errorHandler from './middlewares/errorHandler'
import responseHandler from './middlewares/responseHandler'
import config from './config'
import inspector from './inspector'
import { db } from './connection'
import jwt from 'koa-jwt'
import { secret } from './config/token'

db.authenticate()
  .then(() => console.log('Connection has been established successfully.'))
  .catch(err => console.log(err))

inspector.check()
const app = new Koa()
app.use(errorHandler())
app.use(responseHandler())
app.use(bodyParser())

// Trust proxy
// app.keys = ['im a newer secret', 'i like turtle']
// app.proxy = true

app.use(requestID())
app.use(
  cors({
    origin: '*',
    allowMethods: ['GET', 'HEAD', 'PUT', 'POST', 'DELETE', 'PATCH'],
    exposeHeaders: ['X-Request-Id']
  })
)
app.use(httpLogger())

app.use(jwt({ secret }).unless({
  path: [
    /\/home/,
    /\/swagger-html/,
    /\/swagger-json/,
    /\/login\/google/
  ]
}))

app.use(routers.routes()).use(routers.allowedMethods())
app.listen(config.port, () => {
  console.log(`service start at ${config.port}`)
})
