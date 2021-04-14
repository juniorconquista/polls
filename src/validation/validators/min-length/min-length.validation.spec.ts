import faker from 'faker'
import { InvalidFieldError } from '@/validation/errors'
import { MinLengthValidation } from './min-length.validation'

const makeSut = (length: number): MinLengthValidation => new MinLengthValidation(faker.database.column(), length)

describe('MinLengthValidation', () => {
  it('should return error if value is invalid', () => {
    const sut = makeSut(5)
    expect(sut.validate(faker.random.alphaNumeric(4))).toEqual(new InvalidFieldError())
  })

  it('should return falsy if value is valid', () => {
    const sut = makeSut(5)
    expect(sut.validate(faker.random.alphaNumeric(5))).toBeFalsy()
  })
})
