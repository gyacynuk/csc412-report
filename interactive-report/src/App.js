import { ThemeProvider } from 'styled-components'
import { GlobalStyleComponent, lightTheme } from './theme'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import ContentWrapper from './components/content-wrapper'
import Paper from './pages/paper'

import 'katex/dist/katex.min.css'
import NotFoundPage from './pages/not-found'


function App() {
  return (
	<ThemeProvider theme={lightTheme}>
		<GlobalStyleComponent />

		<ContentWrapper>
			<Router>
				<Switch>
					<Route path='/' exact component={Paper} />


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
