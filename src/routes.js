import React from 'react'
import { render } from 'react-dom'
import { Router, Route, Link } from 'react-router'
import App from './app'
import About from './about'

const routes = (
  <Router>
    <Route path="/" component={App}>
      <Route path="about" component={About} />
    </Route>
  </Router>
)

export default routes
