import { Validation } from '@/presentation/protocols/Validation'

export class ValidationStub implements Validation {
  errorMessage: string

  validate (fieldName: string, input: object): string {
    return this.errorMessage
  }
}
