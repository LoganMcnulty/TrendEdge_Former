import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import {
  About,
  User,
  Login,
  Signup,
  Trend,
  Watchlist,
  PageNotFound,
  LandingPage,
  Logout
} from 'pages'

export default function Routes({ user, sectorHealthDataPass }) {

  return (
    <Router>
      <Switch>
        <Route exact path='/' component={LandingPage} />
        <Route exact path='/About' component={About} />
        <Route
          exact path='/User'
          render={props => <User {...props} user={user} />}
        />
        <Route 
        exact path='/Sector' 
        render = {props => <Trend {...props} sectorHealthDataPass={sectorHealthDataPass}
        />}
        />
        <Route
          exact
          path='/Watchlist'
          render={props => <Watchlist {...props} user={user} />}
        />
        <Route exact path='/Login' component={Login} />
        <Route exact path='/Logout' component={Logout} />
        <Route exact path='/Signup' component={Signup} />
        <Route component={PageNotFound} />
      </Switch>
    </Router>
  )
}
