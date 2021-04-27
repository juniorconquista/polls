import React, { useEffect, useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { Footer, LoginHeader } from '@/presentation/components'
import { Input, SubmitButton, FormStatus } from './components'
import Context from '@/presentation/contexts/form/form-context'
import { Validation } from '@/presentation/protocols/Validation'
import { AddAccount } from '@/domain/usecases'
import Styles from './signup-styles.scss'

type Props = {
  validation: Validation
  addAccount: AddAccount
}

const Signup: React.FC<Props> = ({ validation, addAccount }: Props) => {
  const [state, setState] = useState({
    isLoading: false,
    name: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    nameError: '',
    emailError: '',
    passwordError: '',
    passwordConfirmationError: '',
    mainError: ''
  })

  useEffect(() => {
    setState({
      ...state,
      nameError: validation.validate('name', state.name),
      emailError: validation.validate('email', state.email),
      passwordError: validation.validate('password', state.password),
      passwordConfirmationError: validation.validate('validationError', state.passwordConfirmation)
    })
  }, [state.name, state.email, state.password, state.passwordConfirmation])

  const handleSubmit = useCallback(async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()
    try {
      if (!state.isLoading && (!state.nameError || !state.emailError || !state.passwordError || !state.passwordConfirmationError)) {
        setState({
          ...state,
          isLoading: true
        })
        await addAccount.add({
          name: state.name,
          email: state.email,
          password: state.password,
          passwordConfirmation: state.passwordConfirmation
        })
      }
    } catch (error) {
      setState({
        ...state,
        isLoading: false,
        mainError: error.message
      })
    }
  }, [state.name, state.email, state.password, state.passwordConfirmation])

  return (
    <div className={Styles.signupWrap}>
      <Context.Provider value={{ state, setState }} >
        <LoginHeader />
        <form data-testid="form" className={Styles.form} onSubmit={handleSubmit}>
          <h2>Cria conta</h2>
          <Input type="text" name="name" placeholder="Digite seu nome" />
          <Input type="email" name="email" placeholder="Digite seu e-mail" />
          <Input type="password" name="password" placeholder="Digite sua senha" />
          <Input type="password" name="passwordConfirmation" placeholder="Repita sua senha" />
          <SubmitButton text="Entrar" />
          <Link data-testid="/login" to="/signup" className={Styles.link}>Login</Link>
          <FormStatus />
        </form>
      </Context.Provider>
      <Footer />
    </div>
  )
}

export default Signup
