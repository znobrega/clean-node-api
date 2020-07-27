import { EmaiLValidatorAdapter } from './email-validator'
import validator from 'validator'

jest.mock('validator', () => ({
  isEmail (): boolean {
    return true
  }
}))

describe('EmailValidator Adapter', () => {
  test('Shoulf return false if validator return false', () => {
    jest.spyOn(validator, 'isEmail').mockReturnValueOnce(false)
    const sut = new EmaiLValidatorAdapter()
    const isValid = sut.isValid('invalid_email')

    expect(isValid).toBe(false)
  })

  test('Shoulf return true if validator return true', () => {
    const sut = new EmaiLValidatorAdapter()
    const isValid = sut.isValid('valid_email@mail.com')

    expect(isValid).toBe(true)
  })
})
