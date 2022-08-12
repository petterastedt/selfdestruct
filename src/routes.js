import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Home from './pages/home'
import Message from './pages/message'
import About from './pages/about'

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" render={() => <Home />} />
      <Route exact path="/about" render={() => <About />} />
      <Route exact path="/message/:secret" render={() => <Message />} />
      {/* <Route component={Four04} /> */}
    </Switch>
  )
}

export default Routes
