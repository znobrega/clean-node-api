import { EmailValidator } from '../presentation/protocols/email-validator'

export class EmaiLValidatorAdapter implements EmailValidator {
  isValid (email: string): boolean {
    return false
  }
}
