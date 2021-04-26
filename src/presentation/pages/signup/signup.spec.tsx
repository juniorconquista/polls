import React from 'react'
// import faker from 'faker'
import { createMemoryHistory } from 'history'
import { cleanup, render, RenderResult } from '@testing-library/react'
import { Router } from 'react-router-dom'
import { Helper } from '@/presentation/test'
import Signup from './signup'

type SutTypes = {
  sut: RenderResult
}

const history = createMemoryHistory({ initialEntries: ['/'] })

const makeSut = (): SutTypes => {
  const sut = render(
        <Router history={history}>
            <Signup />
        </Router>
  )
  return {
    sut
  }
}

describe('Signup component', () => {
  afterEach(cleanup)

  it('should start with initial state', () => {
    const validationError = 'Campo obrigatório'
    makeSut()
    Helper.testChildCount('error-wrap', 0)
    // Helper.testButtonIsDisabled('submit')
    Helper.testStatusForField('name', validationError)
    Helper.testStatusForField('email', validationError)
    Helper.testStatusForField('password', validationError)
    Helper.testStatusForField('passwordConfirmation', validationError)
  })

  it('should show email error if Validation fails', () => {
    const validationError = faker.random.words()
    makeSut({ validationError })
    populateEmailField()
    Helper.testStatusForField('email', validationError)
  })
})
