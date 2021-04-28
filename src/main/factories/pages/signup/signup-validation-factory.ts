import { ValidationComposite } from '@/validation/validators'
import { ValidationBuilder as Builder } from '@/validation/validators/builder/validation-builder'

export const makeSignupValidation = (): ValidationComposite => {
  const validations = [
    ...Builder.field('name').required().min(5).build(),
    ...Builder.field('email').required().email().build(),
    ...Builder.field('password').required().min(5).build(),
    ...Builder.field('passwordConfirmation').required().min(5).build()
  ]
  return ValidationComposite.build(validations)
}
