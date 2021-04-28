import faker from 'faker'
import { InvalidFieldError } from '@/validation/errors'
import { MinLengthValidation } from './min-length.validation'

const makeSut = (field: string, length: number): MinLengthValidation => new MinLengthValidation(field, length)

describe('MinLengthValidation', () => {
  it('should return error if value is invalid', () => {
    const field = faker.database.column()
    const sut = makeSut(field, 5)
    expect(sut.validate({ [field]: faker.random.alphaNumeric(4) })).toEqual(new InvalidFieldError())
  })

  it('should return falsy if value is valid', () => {
    const field = faker.database.column()
    const sut = makeSut(field, 5)
    expect(sut.validate({ [field]: faker.random.alphaNumeric(5) })).toBeFalsy()
  })

  it('should return falsy if field does not exists in schema', () => {
    const sut = makeSut(faker.database.column(), 5)
    expect(sut.validate({ [faker.database.column()]: faker.random.alphaNumeric(5) })).toBeFalsy()
  })
})
