import React from 'react'
import PropTypes from 'prop-types'
import { Route, useHistory } from 'react-router'

const ProtectedRoute = ({ user, component: Component, ...rest }) => {
    const history = useHistory()
    if (!user?.isAdmin) {
        history.push('/403')
    }

    return (
        <Route {...rest} render={props => (
            <Component {...props} {...rest} />
        )}/>
    )
}

ProtectedRoute.propTypes = {

}

export default ProtectedRoute
