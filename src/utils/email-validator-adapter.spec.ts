import { EmaiLValidatorAdapter } from './email-validator'

describe('EmailValidator Adapter', () => {
  test('Shoulf return false if validator return false', () => {
    const sut = new EmaiLValidatorAdapter()
    const isValid = sut.isValid('invalid_email')

    expect(isValid).toBe(false)
  })
})
