import faker from 'faker'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

export const testChildCount = (fieldName: string, count: number): void => {
  expect(screen.getByTestId(fieldName).childElementCount).toBe(count)
}

export const testButtonIsDisabled = (fieldName: string): void => {
  expect(screen.getByTestId(fieldName)).toBeDisabled()
}

export const testStatusForField = (fieldName: string, validationError?: string): void => {
  expect(screen.getByTestId(`${fieldName}-label`).title).toBe(validationError || 'ok')
  expect(screen.getByTestId(`${fieldName}-wrap`)).toHaveAttribute('data-status', validationError ? 'invalid' : 'valid')
}

export const populateField = (fieldName: string, value = faker.random.words()): void => {
  userEvent.type(screen.getByTestId(fieldName), value)
}
