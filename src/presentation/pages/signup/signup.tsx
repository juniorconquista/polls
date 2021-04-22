import React from 'react'
import { Link } from 'react-router-dom'
import { Footer, LoginHeader } from '@/presentation/components'
import { Input, SubmitButton, FormStatus } from './components'
import Context from '@/presentation/contexts/form/form-context'
import Styles from './signup-styles.scss'

type Props = {}

const Signup: React.FC<Props> = () => {
  return (
    <div className={Styles.signupWrap}>
      <Context.Provider value={{ state: {} }} >
        <LoginHeader />
        <form data-testid="form" className={Styles.form}>
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
