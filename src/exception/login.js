export class GoogleLoginError extends Error {
  constructor(message) {
    super()
    this.name = 'GoogleLoginError'
    this.message = message || 'Google login fail.'
    this.stack = (new Error()).stack
  }
}
