import React, { useEffect, useState, useCallback } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Footer, LoginHeader } from '@/presentation/components'
import { Input, SubmitButton, FormStatus } from './components'
import Context from '@/presentation/contexts/form/form-context'
import { Validation } from '@/presentation/protocols/Validation'
import { AddAccount, SaveAccessToken } from '@/domain/usecases'
import Styles from './signup-styles.scss'

type Props = {
  validation: Validation
  addAccount: AddAccount
  saveAccessToken: SaveAccessToken
}

const Signup: React.FC<Props> = ({ validation, addAccount, saveAccessToken }: Props) => {
  const history = useHistory()
  const [state, setState] = useState({
    isLoading: false,
    isFormInvalid: true,
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
    const { name, email,password, passwordConfirmation } = state
    const formData = { name, email,password, passwordConfirmation }

    const nameError = validation.validate('name', formData)
    const emailError = validation.validate('email', formData)
    const passwordError = validation.validate('password', formData)
    const passwordConfirmationError = validation.validate('passwordConfirmation',formData)

    setState({
      ...state,
      nameError,
      emailError,
      passwordError,
      passwordConfirmationError,
      isFormInvalid: !!nameError || !!emailError || !!passwordError || !!passwordConfirmationError
    })
  }, [state.name, state.email, state.password, state.passwordConfirmation])

  const handleSubmit = useCallback(async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()
    try {
      if (!state.isLoading && !state.isFormInvalid) {
        setState({
          ...state,
          isLoading: true
        })
        const account = await addAccount.add({
          name: state.name,
          email: state.email,
          password: state.password,
          passwordConfirmation: state.passwordConfirmation
        })
        await saveAccessToken.save(account.accessToken)
        history.replace('/')
      }
    } catch (error) {
      setState({
        ...state,
        isLoading: false,
        mainError: error.message
      })
    }
  }, [state.name, state.email, state.password, state.passwordConfirmation, state.isFormInvalid])

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
          <Link
            data-testid="login-link"
            to="/login"
            className={Styles.link}
            replace
          >
            Login
          </Link>
          <FormStatus />
        </form>
      </Context.Provider>
      <Footer />
    </div>
  )
}

export default Signup
