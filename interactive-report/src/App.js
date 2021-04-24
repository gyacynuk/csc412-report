import { useState } from 'react'
import { ThemeProvider } from 'styled-components'
import { GlobalStyleComponent, lightTheme } from './theme'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import ProtectedRoute from './components/protected-route'
import ErrorPage from './pages/error-page'
import ContentWrapper from './components/content-wrapper'
import Paper from './pages/paper'
import SurveyLogin from './pages/survey-login'
import Dashboard from './pages/dashboard'

import 'react-toastify/dist/ReactToastify.css'
import 'katex/dist/katex.min.css'
import Survey from './pages/survey'


function App() {
	const [ user, setUser ] = useState({})

	return (
		<ThemeProvider theme={lightTheme}>
			<GlobalStyleComponent />
			<ToastContainer />

			<ContentWrapper>
				<Router>
					<Switch>
						<Route path='/' exact component={Paper} />
						<Route path='/login' exact>
							<SurveyLogin setUser={setUser}/>
						</Route>
						<ProtectedRoute path='/survey' exact user={user} setUser={setUser} component={Survey}/>
						<ProtectedRoute path='/dashboard' exact user={user} setUser={setUser} adminOnly={true} component={Dashboard}/>

						{/* Error pages */}
						<Route path='/403' exact>
							<ErrorPage title={'403'} message={'You do not have permission to access this page'} />
						</Route>
						<Route path='/404' exact>
							<ErrorPage title={'404'} message={'The page you were looking for could not be found'} />
						</Route>

						{/* If nothing was matched, then 404 */}
						<Redirect to='/404'/>
					</Switch>
				</Router>
			</ContentWrapper>
			
			
		</ThemeProvider>
	)
}

export default App;
