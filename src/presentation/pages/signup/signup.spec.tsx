import React from 'react'
import faker from 'faker'
import { createMemoryHistory } from 'history'
import { Router } from 'react-router-dom'
import { cleanup, render, RenderResult } from '@testing-library/react'
import { Helper, ValidationStub } from '@/presentation/test'
import Signup from './signup'

type SutTypes = {
  sut: RenderResult
}

type SutParams = {
  validationError?: string
}

const history = createMemoryHistory({ initialEntries: ['/'] })

const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub()
  validationStub.errorMessage = params?.validationError
  const sut = render(
    <Router history={history}>
      <Signup
        validation={validationStub}
      />
    </Router>
  )
  return {
    sut
  }
}

describe('Signup component', () => {
  afterEach(cleanup)

  it('should start with initial state', () => {
    const validationError = faker.random.words()
    makeSut({ validationError })
    Helper.testChildCount('error-wrap', 0)
    // Helper.testButtonIsDisabled('submit')
    Helper.testStatusForField('name', validationError)
    Helper.testStatusForField('email', 'Campo obrigatório')
    Helper.testStatusForField('password', 'Campo obrigatório')
    Helper.testStatusForField('passwordConfirmation', 'Campo obrigatório')
  })

  it('should show name error if Validation fails', () => {
    const validationError = faker.random.words()
    makeSut({ validationError })
    Helper.populateField('name')
    Helper.testStatusForField('name', validationError)
  })
})
