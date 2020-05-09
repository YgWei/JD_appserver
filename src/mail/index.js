import nodemailer from 'nodemailer'
import logger from '../logger/system'
import config from '../config'

const transporter = nodemailer.createTransport({
  service: 'gmail',
  secure: false,
  requireTLS: true,
  auth: {
    user: config.mail.userAuth,
    pass: config.mail.passAuth
  }
})

export const sendMail = async function (fromName, fromEmail, to) {
  const mailOptions = {
    from: `"${fromName}"  <${fromEmail}>`, // sender address
    to: `${to}`, // list of receivers
    subject: 'Hello new Guy', // Subject line
    text: 'Hello world?', // plain text body
    html: '<p>Please confirm Your email</p>' // html body
  }

  try {
    const info = await transporter.sendMail(mailOptions)
    return info
  } catch (err) {
    logger.error(err)
    return err
  }
}
