import faker from 'faker'
import { InvalidFieldError } from '@/validation/errors'
import { CompareFieldsValidation } from './compare-fields-validation'

const makeSut = (valueToCompare: string): CompareFieldsValidation => new CompareFieldsValidation(
  faker.database.column(),
  valueToCompare
)

describe('CompareFieldsValidation', () => {
  it('should return error if compare is invalid', () => {
    const sut = makeSut(faker.random.word())
    expect(sut.validate(faker.random.word())).toEqual(new InvalidFieldError())
  })

  //   it('should return falsy if field is not empty', () => {
  //     const sut = makeSut()
  //     expect(sut.validate(faker.random.word())).toBeFalsy()
  //   })
})
