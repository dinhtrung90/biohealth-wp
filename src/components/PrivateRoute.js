import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
import { APP_TOKEN } from 'src/constants/constants'

const PrivateRoute = ({ component: Component, ...rest }) => {
  const token = localStorage.getItem(APP_TOKEN)

  if (!token) {
    return (
      <Redirect
        to={{
          pathname: '/login',
        }}
      />
    )
  }

  const renderRedirect = (props) => {
    let defaultUrl = '/login'
    if (token && token.length > 0) {
      return <Component {...props} />
    }

    return (
      <Redirect
        to={{
          pathname: defaultUrl,
        }}
      />
    )
  }

  if (!Component) throw new Error(`A component needs to be specified for private route for path}`)

  return <Route {...rest} render={renderRedirect} />
}

export default PrivateRoute
