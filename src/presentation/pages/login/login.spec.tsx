import React from 'react'
import { render, screen, RenderResult } from '@testing-library/react'
import Login from './login'

type SutTypes = {
  sut: RenderResult
}
const makeSut = (): SutTypes => {
  const sut = render(<Login />)
  return {
    sut
  }
}

describe('Login component', () => {
  it('should start with initial state', () => {
    makeSut()
    expect(screen.getByTestId('error-wrap').childElementCount).toBe(0)
    expect(screen.getByTestId('submit')).toBeDisabled()
    expect(screen.getByTestId('email-label').title).toBe('Campo obrigatório')
    expect(screen.getByTestId('password-label').title).toBe('Campo obrigatório')
    expect(screen.getByTestId('password-wrap')).toHaveAttribute('data-status', 'invalid')
  })
})
