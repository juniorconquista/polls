import React from 'react'
import { Signup } from '@/presentation/pages'
import { makeRemoteAddAccount } from '@/main/factories/useCases/add-account/remote-add-account-factory'
import { makeSignupValidation } from './signup-validation-factory'
import { makeLocalSaveAccessToken } from '../../useCases/save-access-token/local-save-access-token-factory'

export const makeSignup: React.FC = () => {
  return (
    <Signup
      validation={makeSignupValidation()}
      addAccount={makeRemoteAddAccount()}
      saveAccessToken={makeLocalSaveAccessToken()}
    />
  )
}
