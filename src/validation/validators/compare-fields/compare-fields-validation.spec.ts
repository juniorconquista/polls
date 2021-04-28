import faker from 'faker'
import { InvalidFieldError } from '@/validation/errors'
import { CompareFieldsValidation } from './compare-fields-validation'

const makeSut = (field: string, fieldToCompare: string): CompareFieldsValidation => new CompareFieldsValidation(
  field,
  fieldToCompare
)

describe('CompareFieldsValidation', () => {
  it('should return error if compare is invalid', () => {
    const field = faker.database.column()
    const fieldToCompare = faker.database.column()
    const sut = makeSut(field, fieldToCompare)
    expect(sut.validate({ [field]: faker.random.word(), [fieldToCompare]: faker.random.word() })).toEqual(new InvalidFieldError())
  })

  it('should return falsy if compare is valid', () => {
    const field = faker.database.column()
    const fieldToCompare = faker.database.column()
    const value = faker.random.word()
    const sut = makeSut(field, fieldToCompare)
    expect(sut.validate({ [field]: value, [fieldToCompare]: value })).toBeFalsy()
  })
})
