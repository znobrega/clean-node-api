import { HttpRequest, HttpResponse, AddAccount, AddAccountModel, Controller, EmailValidator } from './signup-protocols'
import { badRequest, serverError, ok } from '../../helpers/http-helpers'
import { MissingParamError, InvalidParamError, ServerError } from '../../errors'
export class SignUpController implements Controller {
  private readonly emailValidator: EmailValidator
  private readonly addAccount: AddAccount

  constructor (emailValidator: EmailValidator, addAccount: AddAccount) {
    this.emailValidator = emailValidator
    this.addAccount = addAccount
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }

      const { name, email, password, passwordConfirmation } = httpRequest.body

      if (password !== passwordConfirmation) {
        return badRequest(new InvalidParamError('passwordConfirmation'))
      }
      const isValidEmail = this.emailValidator.isValid(email)
      if (!isValidEmail) {
        return badRequest(new InvalidParamError('email'))
      }
      const account: AddAccountModel = {
        name,
        email,
        password
      }

      const acc = await this.addAccount.add(account)

      return ok(acc)
    } catch (error) {
      return serverError(new ServerError())
    }
  }
}
