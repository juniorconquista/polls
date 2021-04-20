import { AccountModel } from '../models'

export type AddAccountParams = {
  name: string
  email: string
  password: string
  passwordConfirmation: string
}

export interface AddAccount {
  add: (parmas: AddAccountParams) => Promise<AccountModel>
}
