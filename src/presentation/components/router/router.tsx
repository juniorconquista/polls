import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

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
            </Switch>
        </BrowserRouter>
  )
}

export default Router
