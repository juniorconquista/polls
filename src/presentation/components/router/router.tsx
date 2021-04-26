import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

type Props = {
  makeLogin: React.FC
  makeSignup: React.FC
}

const Router: React.FC<Props> = ({ makeLogin: Login, makeSignup: Signup }: Props) => {
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
