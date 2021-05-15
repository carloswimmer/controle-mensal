import { Route, Switch, withRouter } from 'react-router-dom'
import SignIn from '../pages/SignIn'

const Routes = withRouter(({ location }) => (
  <Switch location={location}>
    <Route path="/" exact component={SignIn} />
  </Switch>
))

export default Routes
