import React from 'react'
// import faker from 'faker'
import { createMemoryHistory } from 'history'
import { cleanup, render, RenderResult, screen } from '@testing-library/react'
import { Router } from 'react-router-dom'
import Signup from './signup'

type SutTypes = {
  sut: RenderResult
}

const history = createMemoryHistory({ initialEntries: ['/'] })

const makeSut = (): SutTypes => {
  const sut = render(
        <Router history={history}>
            <Signup

            />
        </Router>
  )
  return {
    sut
  }
}

const testChildCount = (fieldName: string, count: number): void => {
  expect(screen.getByTestId(fieldName).childElementCount).toBe(count)
}

// const testButtonIsDisabled = (fieldName: string): void => {
//   expect(screen.getByTestId(fieldName)).toBeDisabled()
// }

const testStatusForField = (fieldName: string, validationError?: string): void => {
  expect(screen.getByTestId(`${fieldName}-label`).title).toBe(validationError || 'ok')
  expect(screen.getByTestId(`${fieldName}-wrap`)).toHaveAttribute('data-status', validationError ? 'invalid' : 'valid')
}

describe('Signup component', () => {
  afterEach(cleanup)

  it('should start with initial state', () => {
    const validationError = 'Campo obrigatório'
    makeSut()
    testChildCount('error-wrap', 0)
    // testButtonIsDisabled('submit')
    testStatusForField('name', validationError)
    testStatusForField('email', validationError)
    testStatusForField('password', validationError)
    testStatusForField('passwordConfirmation', validationError)
  })
})
