import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  BrowserRouter,
} from 'react-router-dom'
import Home from './home'
import Layout from '../components/Layout'
import SignUp from './signup'
import SignIn from './signin'
import Interview from './interview'
import Stats from './stats'
import Statistics from './pdf'
import Plans from './planTomorrow'

const Pages = () => {
  return (
    <Layout>
      <Router>
        <Route exact path="/" component={Home} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/signin" component={SignIn} />
        <Route exact path="/interview" component={Interview} />
        <Route exact path="/stats" component={Stats} />
        <Route exact path="/document" component={Statistics} />
        <Route exact path="/todo" component={Plans} />
      </Router>
    </Layout>
  )
}

export default Pages
