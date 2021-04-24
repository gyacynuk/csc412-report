import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Route, useHistory } from 'react-router'
import Api from '../../api'
import LoadingPage from '../../pages/loading'

const ProtectedRoute = ({ user, setUser, adminOnly, component: Component, children, ...rest }) => {
    const history = useHistory()
    const [ loading, setLoading ] = useState(true)

    useEffect(() => {
		if (user?.username) {
			setLoading(false)
		}
		else {
			Api.User.getSessionUserNoInterceptor()
				.then(res => {
                    console.log(res)
					setTimeout(() => {
                        setUser(res.user)
                        if (adminOnly && !res?.user?.isAdmin) {
                            history.push('/403')
                        } else {
                            setLoading(false)
                        }
					}, 1000)
				})
				.catch(error => {
                    console.log(error)
					history.push('/403')
				})
		}
	}, [ adminOnly, history, user, setUser ])

    return (
        loading
            ? <LoadingPage/>
            : <Route {...rest} render={props => ( <Component {...props}/> )}/>
    )
}

ProtectedRoute.propTypes = {
    user: PropTypes.object.isRequired,
    setUser: PropTypes.func.isRequired,
    component: PropTypes.any.isRequired,

    adminOnly: PropTypes.bool,
}

ProtectedRoute.defaultProps = {
    adminOnly: false
}

export default ProtectedRoute
