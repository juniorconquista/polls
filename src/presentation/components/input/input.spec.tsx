
import React from 'react'
import faker from 'faker'
import { InputBase } from '@/presentation/components'
import { render, fireEvent, screen } from '@testing-library/react'
import Context from '@/presentation/contexts/form/form-context'

const makeSut = (fieldName: string): void => {
  render(
    <Context.Provider value={{ state: {} }}>
      <InputBase name={fieldName} />
    </Context.Provider>
  )
}

describe('Input Component', () => {
  it('Should begin with readOnly', () => {
    const field = faker.database.column()
    makeSut(field)
    const input = screen.getByTestId(field) as HTMLInputElement
    expect(input.readOnly).toBe(true)
  })

  test('Should remove readOnly on focus', () => {
    const field = faker.database.column()
    makeSut(field)
    const input = screen.getByTestId(field) as HTMLInputElement
    fireEvent.focus(input)
    expect(input.readOnly).toBe(false)
  })

  test('Should focus input on label click', () => {
    const field = faker.database.column()
    makeSut(field)
    fireEvent.click(screen.getByTestId(`${field}-label`))
    expect(document.activeElement).toBe(screen.getByTestId(field))
  })
})
