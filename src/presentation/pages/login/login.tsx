import React from 'react'
import { Footer, LoginHeader } from '@/presentation/components'
import { Input, SubmitButton, FormStatus } from './components'
import Styles from './login-styles.scss'

const Login: React.FC = () => {
  return (
    <div className={Styles.loginWrap}>
      <LoginHeader />
      <form data-testid="form" className={Styles.form}>
        <h2>Login</h2>
        <Input type="email" name="email" placeholder="Digite seu e-mail" />
        <Input type="password" name="password" placeholder="Digite sua senha" />
        <SubmitButton text="Entrar" />
        <a data-testid="signup-link" href="/signup" className={Styles.link}>Criar conta</a>
        <FormStatus />
      </form>
      <Footer />
    </div>
  )
}

export default Login
