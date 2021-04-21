import { ThemeProvider } from 'styled-components'
import { GlobalStyleComponent, lightTheme } from './theme'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import ContentWrapper from './components/content-wrapper'
import Paper from './pages/paper'
import NotFoundPage from './pages/not-found'
import SurveyLogin from './pages/survey-login'

import 'react-toastify/dist/ReactToastify.css'
import 'katex/dist/katex.min.css'



function App() {
  return (
	<ThemeProvider theme={lightTheme}>
		<GlobalStyleComponent />
		<ToastContainer />

		<ContentWrapper>
			<Router>
				<Switch>
					<Route path='/' exact component={Paper} />
					<Route path='/survey' exact component={SurveyLogin} />

					{/* If nothing was matched, then 404 */}
					<Route path='/404' exact component={NotFoundPage} />
					<Redirect to='/404'/>
				</Switch>
			</Router>
		</ContentWrapper>
		
		
	</ThemeProvider>
  )
}

export default App;
