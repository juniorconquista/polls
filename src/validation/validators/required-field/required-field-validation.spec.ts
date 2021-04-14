import faker from 'faker'
import { RequiredFieldError } from '@/validation/errors'
import { RequiredFieldValidation } from './required-field-validation'

const makeSut = (): RequiredFieldValidation => new RequiredFieldValidation(faker.database.column())

describe('RequiredFieldValidation', () => {
  it('should return error if field is empty', () => {
    const sut = makeSut()
    expect(sut.validate('')).toEqual(new RequiredFieldError())
  })

  it('should return falsy if field is not empty', () => {
    const sut = makeSut()
    expect(sut.validate(faker.random.word())).toBeFalsy()
  })
})
