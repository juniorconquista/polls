import React, { useState, useEffect, useCallback } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Footer, LoginHeader } from '@/presentation/components'
import { Input, SubmitButton, FormStatus } from './components'
import Context from '@/presentation/contexts/form/form-context'
import { Validation } from '@/presentation/protocols/Validation'
import { Authentication, SaveAccessToken } from '@/domain/usecases'
import Styles from './login-styles.scss'

type Props = {
  validation: Validation
  authentication: Authentication
  saveAccessToken: SaveAccessToken
}

const Login: React.FC<Props> = ({ validation, authentication, saveAccessToken }: Props) => {
  const history = useHistory()
  const [state, setState] = useState({
    isLoading: false,
    isFormInvalid: true,
    email: '',
    password: '',
    emailError: '',
    passwordError: '',
    mainError: ''
  })

  useEffect(() => {
    const { email, password } = state
    const formData = { email, password }

    const emailError = validation.validate('email', formData)
    const passwordError = validation.validate('password', formData)
    setState({
      ...state,
      emailError,
      passwordError,
      isFormInvalid: !!emailError || !!passwordError
    })
  }, [state.email, state.password])

  const handleSubmit = useCallback(async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()
    try {
      if (!state.isLoading && !state.isFormInvalid) {
        setState({
          ...state,
          isLoading: true
        })
        const account = await authentication.auth({ email: state.email, password: state.password })
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
  }, [state.email, state.password])

  return (
    <div className={Styles.loginWrap}>
      <Context.Provider value={{ state, setState }} >
        <LoginHeader />
        <form data-testid="form" className={Styles.form} onSubmit={handleSubmit}>
          <h2>Login</h2>
          <Input type="email" name="email" placeholder="Digite seu e-mail" />
          <Input type="password" name="password" placeholder="Digite sua senha" />
          <SubmitButton text="Entrar" />
          <Link data-testid="signup-link" to="/signup" className={Styles.link}>Criar conta</Link>
          <FormStatus />
        </form>
      </Context.Provider>
      <Footer />
    </div>
  )
}

export default Login
