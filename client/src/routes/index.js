import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import {
  About,
  User,
  Trend,
  Watchlist,
  PageNotFound,
  LandingPage,
  ActiveOptions,
} from 'pages';

export default function Routes() {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={LandingPage} />
        <Route exact path='/About' component={About} />
        <Route exact path='/ActiveOptions' component={ActiveOptions} />
        <Route exact path='/User' component={User} />
        <Route exact path='/Sector' component={Trend} />
        <Route exact path='/Watchlist' component={Watchlist} />
        <Route component={PageNotFound} />
      </Switch>
    </Router>
  );
}
