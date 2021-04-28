import faker from 'faker'
import { RequiredFieldError } from '@/validation/errors'
import { RequiredFieldValidation } from './required-field-validation'

const makeSut = (field: string): RequiredFieldValidation => new RequiredFieldValidation(field)

describe('RequiredFieldValidation', () => {
  it('should return error if field is empty', () => {
    const field = faker.database.column()
    const sut = makeSut(field)
    expect(sut.validate({ [field]: '' })).toEqual(new RequiredFieldError())
  })

  it('should return falsy if field is not empty', () => {
    const field = faker.database.column()
    const sut = makeSut(field)
    expect(sut.validate({ [field]: faker.random.word() })).toBeFalsy()
  })
})
