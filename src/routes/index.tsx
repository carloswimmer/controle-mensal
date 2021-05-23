import { Route, Switch, withRouter } from 'react-router-dom'
import PrivateRoute from './PrivateRoute'
import SignIn from '../pages/SignIn'
import SignUp from '../pages/SignUp'
import ForgotPassword from '../pages/ForgotPassword'
import Dashboard from '../pages/Dashboard'

const Routes = withRouter(({ location }) => (
  <Switch location={location}>
    <Route path="/" exact component={SignIn} />
    <Route path="/sign-up" exact component={SignUp} />
    <Route path="/forgot-password" exact component={ForgotPassword} />
    <PrivateRoute path="/dashboard" component={Dashboard} />
  </Switch>
))

export default Routes
