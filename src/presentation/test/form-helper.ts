import { screen } from '@testing-library/react'

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
