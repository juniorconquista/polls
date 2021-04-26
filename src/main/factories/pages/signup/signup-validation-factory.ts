import { ValidationComposite } from '@/validation/validators'
import { ValidationBuilder } from '@/validation/validators/builder/validation-builder'

export const makeSignupValidation = (): ValidationComposite => {
  const validations = [
    ...ValidationBuilder.field('name').required().build()
  ]
  return ValidationComposite.build(validations)
}
