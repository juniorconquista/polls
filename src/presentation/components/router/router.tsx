import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

type Props = {
  MakeLogin: React.FC
}

const Router: React.FC<Props> = ({ MakeLogin }: Props) => {
  return (
        <BrowserRouter>
            <Switch>
                <Route path="/login" exact>
                    <MakeLogin />
                </Route>
            </Switch>
        </BrowserRouter>
  )
}

export default Router
