import faker from 'faker'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

export const testChildCount = (fieldName: string, count: number): void => {
  expect(screen.getByTestId(fieldName).childElementCount).toBe(count)
}

export const testButtonIsDisabled = (fieldName: string, enabled: boolean = true): void => {
  if (enabled) {
    expect(screen.getByTestId(fieldName)).toBeDisabled()
  } else {
    expect(screen.getByTestId(fieldName)).not.toBeDisabled()
  }
}

export const testStatusForField = (fieldName: string, validationError?: string): void => {
  expect(screen.getByTestId(`${fieldName}-label`).title).toBe(validationError || 'ok')
  expect(screen.getByTestId(`${fieldName}-wrap`)).toHaveAttribute('data-status', validationError ? 'invalid' : 'valid')
}

export const populateField = (fieldName: string, value = faker.random.words()): void => {
  userEvent.type(screen.getByTestId(fieldName), value)
}

export const testElementExists = (element: string): void => {
  expect(screen.getByTestId(element)).toBeTruthy()
}

export const testElementText = (element: string, text: string): void => {
  expect(screen.getByTestId(element).textContent).toBe(text)
}
