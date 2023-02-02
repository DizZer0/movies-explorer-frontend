import { Navigate } from 'react-router-dom'

export default function ProtectedRoute({ component: Component, ...props}) {
  if(props.loggedIn) {
    console.log('1')
    return <Component {...props} />
  } else {
    console.log(props.loggedIn)
    return <Navigate to='/' />
  }
}