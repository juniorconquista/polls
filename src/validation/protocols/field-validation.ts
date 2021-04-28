export interface FieldValidation {
  field: string
  validate: (imput: object) => Error
}
