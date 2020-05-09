import request from 'request-promise'
import config from '../config'
import { GoogleLoginError } from '../exception/Login'
import logger from '../logger/system'

const url = config.google.url
const clientId = config.google.clientId
const clientSecret = config.google.clientSecret
// const redirectUri = config.google.redirectUri

export default class Gitlab {
  async getAccessToken(code, mode) {
    const uri = 'postmessage'
    const options = {
      method: 'POST',
      url: `${url}/o/oauth2/token`,
      headers:
      {
        'Content-Type': 'application/json'
      },
      body: {
        client_id: clientId,
        client_secret: clientSecret,
        code: code,
        grant_type: 'authorization_code',
        redirect_uri: uri
      },
      json: true // Automatically stringifies the body to JSON
    }
    try {
      const res = await request(options)
      return res
    } catch (err) {
      logger.error(err)
      throw new GoogleLoginError(err.message)
    }
  }

  async getUser(accessToken) {
    const options = {
      method: 'GET',
      url: `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${accessToken.access_token}`,
      header: {

      },
      json: true // Automatically stringifies the body to JSON
    }
    let res
    try {
      res = await request(options)
      return res
    } catch (err) {
      logger.error(err)
      throw new GoogleLoginError(err.message)
    }
  }
}
