import faker from 'faker'
import { FieldValidationSpy } from '@/validation/test'
import { ValidationComposite } from './validation-composite'

type SutTypes = {
  sut: ValidationComposite
  fieldValidationsSpy: FieldValidationSpy[]
}

const makeSut = (field: string): SutTypes => {
  const fieldValidationsSpy = [
    new FieldValidationSpy(field),
    new FieldValidationSpy(field)
  ]
  const sut = ValidationComposite.build(fieldValidationsSpy)
  return {
    sut,
    fieldValidationsSpy
  }
}

describe('ValidationComposite', () => {
  it('should return error if any validation fails', () => {
    const field = faker.database.column()
    const error = faker.random.words()
    const { sut, fieldValidationsSpy } = makeSut(field)
    fieldValidationsSpy[0].error = new Error(error)
    fieldValidationsSpy[1].error = new Error(faker.random.words())
    expect(sut.validate(field, { [field]: faker.random.word() })).toBe(error)
  })

  it('should return falsy if any validation succeed', () => {
    const field = faker.database.column()
    const { sut } = makeSut(field)
    expect(sut.validate(field, { [field]: faker.random.word() })).toBeFalsy()
  })
})
