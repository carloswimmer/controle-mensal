import { Route, Switch, withRouter } from 'react-router-dom'
import SignIn from '../pages/SignIn'
import Dashboard from '../pages/Dashboard'

const Routes = withRouter(({ location }) => (
  <Switch location={location}>
    <Route path="/" exact component={SignIn} />
    <Route path="/dashboard" component={Dashboard} />
  </Switch>
))

export default Routes
