import faker from 'faker'
import { InvalidFieldError } from '@/validation/errors'
import { EmailValidation } from './email-validation'

const makeSut = (field: string): EmailValidation => new EmailValidation(field)

describe('EmailValidation', () => {
  it('should return error if email is invalid', () => {
    const field = faker.database.column()
    const sut = makeSut(field)
    expect(sut.validate({ [field]: faker.random.word() })).toEqual(new InvalidFieldError())
  })

  it('should return falsy if email is valid', () => {
    const field = faker.database.column()
    const sut = makeSut(field)
    expect(sut.validate({ [field]: faker.internet.email() })).toBeFalsy()
  })

  it('should return falsy if email is empty', () => {
    const field = faker.database.column()
    const sut = makeSut(field)
    expect(sut.validate({ [field]: '' })).toBeFalsy()
  })
})
