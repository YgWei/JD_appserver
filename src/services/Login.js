import { secret } from '../config/token'
import { User } from '../models/User'
import jwt from 'jsonwebtoken'
import Google from '../util/google'

export default class LoginService {
  async login(body) {
  }

  async loginGoogle(code, mode) {
    const google = new Google()

    const accessToken = await google.getAccessToken(code, mode)
    console.log('accessToken', accessToken)
    const googleUser = await google.getUser(accessToken)
    console.log('googleUser', googleUser)
    let user = await User.findOne({
      where: {
        email: googleUser.email
      }
    })
    if (user === null) {
      user = await User.create({
        first_name: googleUser.given_name,
        last_name: googleUser.family_name,
        email: googleUser.email,
        status: 'active'
      })
    }
    console.log('user', user.dataValues)

    const payload = {
      id: user.dataValues.id,
      name: `${user.dataValues.first_name} ${user.dataValues.last_name}`,
      email: user.dataValues.email,
      gitlab: accessToken.access_token
    }
    const token = jwt.sign(payload, secret, { expiresIn: '30 days' })
    return token
  }

  // async getUserTmsData(uuid) {
  //   const query = `FOR user IN User
  //                 FILTER user.uuid == '${uuid}'
  //                 RETURN user`
  //   const results = await super.query(query)
  //   if (results.count === 1) {
  //     const result = results.data[0]
  //     delete result._key
  //     delete result._id
  //     delete result._rev
  //     delete result.uuid
  //     return result
  //   }
  //   return {}
  // }
}
