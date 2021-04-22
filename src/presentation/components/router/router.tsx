import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { Signup } from '@/presentation/pages'

type Props = {
  makeLogin: React.FC
}

const Router: React.FC<Props> = ({ makeLogin: Login }: Props) => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" exact>
          <Login />
        </Route>
        <Route path="/signup" exact>
          <Signup />
        </Route>
      </Switch>
    </BrowserRouter>
  )
}

export default Router
