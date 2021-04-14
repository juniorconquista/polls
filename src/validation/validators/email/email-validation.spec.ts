import faker from 'faker'
import { InvalidFieldError } from '@/validation/errors'
import { EmailValidation } from './email-validation'

const makeSut = (): EmailValidation => new EmailValidation(faker.database.column())

describe('EmailValidation', () => {
  it('should return error if email is invalid', () => {
    const sut = makeSut()
    expect(sut.validate(faker.random.word())).toEqual(new InvalidFieldError())
  })

  it('should return falsy if email is valid', () => {
    const sut = makeSut()
    expect(sut.validate(faker.internet.email())).toBeFalsy()
  })

  it('should return falsy if email is empty', () => {
    const sut = makeSut()
    expect(sut.validate('')).toBeFalsy()
  })
})
