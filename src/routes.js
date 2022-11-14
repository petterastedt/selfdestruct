import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import Home from './pages/home'
import Message from './pages/message'
import About from './pages/about'

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" render={() => <Home />} />
      <Route exact path="/about" render={() => <About />} />
      <Route exact path="/message/:secret" render={() => <Message />} />
      <Redirect from="*" to="/" />
    </Switch>
  )
}

export default Routes
