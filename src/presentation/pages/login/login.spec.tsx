import React from 'react'
import faker from 'faker'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import { render, screen, RenderResult, cleanup, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ValidationStub, AuthenticationSpy, SaveAccessTokenMock } from '@/presentation/test'
import { InvalidCredentialsError } from '@/domain/errors'
import Login from './login'

type SutTypes = {
  sut: RenderResult
  authenticationSpy: AuthenticationSpy
  saveAccessTokenMock: SaveAccessTokenMock
}

type SutParams = {
  validationError?: string
}

const history = createMemoryHistory({ initialEntries: ['/login'] })

const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub()
  const saveAccessTokenMock = new SaveAccessTokenMock()
  const authenticationSpy = new AuthenticationSpy()
  validationStub.errorMessage = params?.validationError
  const sut = render(
    <Router history={history}>
      <Login
        validation={validationStub}
        authentication={authenticationSpy}
        saveAccessToken={saveAccessTokenMock}
      />
    </Router>
  )
  return {
    sut,
    authenticationSpy,
    saveAccessTokenMock
  }
}

const simulateValidSubmit = async (
  email = faker.internet.email(),
  password = faker.internet.password()
): Promise<void> => {
  populateEmailField(email)
  populatePasswordField(password)
  const form = screen.getByTestId('form')
  fireEvent.submit(form)
  await waitFor(() => form)
}

const populateEmailField = (email = faker.internet.email()): void => {
  userEvent.type(screen.getByTestId('email'), email)
}

const populatePasswordField = (password = faker.internet.password()): void => {
  userEvent.type(screen.getByTestId('password'), password)
}

const testStatusForField = (fieldName: string, validationError?: string): void => {
  expect(screen.getByTestId(`${fieldName}-label`).title).toBe(validationError || 'ok')
  expect(screen.getByTestId(`${fieldName}-wrap`)).toHaveAttribute('data-status', validationError ? 'invalid' : 'valid')
}

const testErrorChildCount = (count: number): void => {
  expect(screen.getByTestId('error-wrap').childElementCount).toBe(count)
}

const testElementExists = (element: string): void => {
  expect(screen.getByTestId(element)).toBeTruthy()
}

const testElementText = (element: string, text: string): void => {
  expect(screen.getByTestId(element).textContent).toBe(text)
}

describe('Login component', () => {
  afterEach(cleanup)

  it('should start with initial state', () => {
    const validationError = faker.random.words()
    makeSut({ validationError })
    testErrorChildCount(0)
    expect(screen.getByTestId('submit')).toBeDisabled()
    testStatusForField('email', validationError)
    testStatusForField('password', validationError)
  })

  it('should show email error if Validation fails', () => {
    const validationError = faker.random.words()
    makeSut({ validationError })
    populateEmailField()
    testStatusForField('email', validationError)
  })

  it('should show password error if Validation fails', () => {
    const validationError = faker.random.words()
    makeSut({ validationError })
    populatePasswordField()
    testStatusForField('password', validationError)
  })

  it('should show valid email state if Validation succeeds', () => {
    makeSut()
    populateEmailField()
    testStatusForField('email')
  })

  it('should show valid email state if Validation succeeds', () => {
    makeSut()
    populatePasswordField()
    testStatusForField('password')
  })

  it('should enabled submit button if from is valid', () => {
    makeSut()
    populateEmailField()
    populatePasswordField()
    expect(screen.getByTestId('submit')).not.toBeDisabled()
  })

  it('should show spinner on submit', async () => {
    makeSut()
    await simulateValidSubmit()
    testElementExists('spinner')
  })

  it('should call Authentication with correct values', async () => {
    const { authenticationSpy } = makeSut()
    const email = faker.internet.email()
    const password = faker.internet.password()
    await simulateValidSubmit(email, password)
    expect(authenticationSpy.params).toEqual({
      email,
      password
    })
  })

  it('should call Authentication only once', async () => {
    const { authenticationSpy } = makeSut()
    await simulateValidSubmit()
    await simulateValidSubmit()
    expect(authenticationSpy.callsCount).toBe(1)
  })

  it('should not call Authentication if form is invalid', async () => {
    const validationError = faker.random.words()
    const { authenticationSpy } = makeSut({ validationError })
    populateEmailField()
    await simulateValidSubmit()
    expect(authenticationSpy.callsCount).toBe(0)
  })

  it('should present error if Authentication fails', async () => {
    const { authenticationSpy } = makeSut()
    const error = new InvalidCredentialsError()
    jest.spyOn(authenticationSpy, 'auth').mockReturnValueOnce(Promise.reject(error))
    await simulateValidSubmit()
    testElementText('main-error', error.message)
    testErrorChildCount(1)
  })

  it('should call SaveAccessToken on success', async () => {
    const { authenticationSpy, saveAccessTokenMock } = makeSut()
    await simulateValidSubmit()
    expect(saveAccessTokenMock.accessToken).toBe(authenticationSpy.account.accessToken)
    expect(history.length).toBe(1)
    expect(history.location.pathname).toBe('/')
  })

  it('should go to signup page', async () => {
    makeSut()
    userEvent.click(screen.getByTestId('signup-link'))
    expect(history.length).toBe(2)
    expect(history.location.pathname).toBe('/signup')
  })
})
