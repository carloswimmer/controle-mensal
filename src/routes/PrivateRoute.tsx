import {
  Redirect,
  Route,
  RouteProps,
  RouteComponentProps,
} from 'react-router-dom'
import { useAuth } from '../hooks/auth'

interface PrivateRouteProps {
  path: RouteProps['path']
  component: (props: RouteComponentProps) => JSX.Element
}

const PrivateRoute = ({ component: Component, ...rest }: PrivateRouteProps) => {
  const { user } = useAuth()

  return (
    <Route
      {...rest}
      render={props => {
        return user?.uid ? <Component {...props} /> : <Redirect to="/" />
      }}
    ></Route>
  )
}

export default PrivateRoute
