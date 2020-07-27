import { HttpRequest, HttpResponse } from '../protocols/http'
import { badRequest, serverError } from '../helpers/http-helpers'
import { MissingParamError, InvalidParamError, ServerError } from '../errors'
import { Controller, EmailValidator } from '../protocols'
import { AddAccount, AddAccountModel } from '../../domain/usecases/add-account'

export class SignUpController implements Controller {
  private readonly emailValidator: EmailValidator
  private readonly addAccount: AddAccount

  constructor (emailValidator: EmailValidator, addAccount: AddAccount) {
    this.emailValidator = emailValidator
    this.addAccount = addAccount
  }

  handle (httpRequest: HttpRequest): HttpResponse {
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
      console.log('calling function add')
      const account: AddAccountModel = {
        name,
        email,
        password
      }
      console.log('calling function add')

      this.addAccount.add(account)
    } catch (error) {
      return serverError(new ServerError())
    }

    return {
      body: 'void',
      statusCode: 200
    }
  }
}
