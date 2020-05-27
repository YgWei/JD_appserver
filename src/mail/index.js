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
  const url = 'http://localhost:8080/login'
  const mailOptions = {
    from: `"${fromName}"  <${fromEmail}>`, // sender address
    to: `${to}`, // list of receivers
    subject: 'Hello new Guy', // Subject line
    text: 'Hello world?', // plain text body
    html: `Please click this email to confirm your email: <a href="${url}">${url}</a>` // html body
  }

  try {
    const info = await transporter.sendMail(mailOptions)
    return info
  } catch (err) {
    logger.error(err)
    return err
  }
}
