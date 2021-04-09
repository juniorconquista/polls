import React from 'react'
import { render, screen } from '@testing-library/react'
import Login from './login'

describe('Login component', () => {
  it('should start with initial state', () => {
    render(<Login />)
    expect(screen.getByTestId('error-wrap').childElementCount).toBe(0)
    expect(screen.getByTestId('submit')).toBeDisabled()
    expect(screen.getByTestId('email-label').title).toBe('Campo obrigatório')
    expect(screen.getByTestId('password-label').title).toBe('Campo obrigatório')
    expect(screen.getByTestId('password-wrap')).toHaveAttribute('data-status', 'invalid')
  })
})
