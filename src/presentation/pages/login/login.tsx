import React, { useState } from 'react'
import { Footer, LoginHeader } from '@/presentation/components'
import { Input, SubmitButton, FormStatus } from './components'
import Context from '@/presentation/contexts/form/form-context'
import Styles from './login-styles.scss'

type StateProps = {
  isLoading: boolean
  errorMessage: string
}

const Login: React.FC = () => {
  const [state] = useState<StateProps>({
    isLoading: false,
    errorMessage: ''
  })

  return (
    <div className={Styles.loginWrap}>
      <Context.Provider value={state}>
        <LoginHeader />
        <form data-testid="form" className={Styles.form}>
          <h2>Login</h2>
          <Input type="email" name="email" placeholder="Digite seu e-mail" />
          <Input type="password" name="password" placeholder="Digite sua senha" />
          <SubmitButton text="Entrar" />
          <a data-testid="signup-link" href="/signup" className={Styles.link}>Criar conta</a>
          <FormStatus />
        </form>
      </Context.Provider>
      <Footer />
    </div>
  )
}

export default Login
