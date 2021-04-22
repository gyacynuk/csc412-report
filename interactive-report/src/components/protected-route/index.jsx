import React from 'react'
import PropTypes from 'prop-types'
import { Route, useHistory } from 'react-router'

const ProtectedRoute = ({ user, adminOnly, component: Component, children, ...rest }) => {
    const history = useHistory()
    
    if (!user) {
        history.push('/403')
    }
    if (adminOnly && !user?.isAdmin) {
        history.push('/403')
    }

    return (
        <Route {...rest} render={props => (
            <Component {...props} />
        )}/>
    )
}

ProtectedRoute.propTypes = {
    user: PropTypes.object.isRequired,
    component: PropTypes.object.isRequired,

    adminOnly: PropTypes.bool,
}

ProtectedRoute.defaultProps = {
    adminOnly: false
}

export default ProtectedRoute
