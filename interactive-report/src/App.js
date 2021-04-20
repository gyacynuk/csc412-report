import styled, { ThemeProvider } from 'styled-components'
import { GlobalStyleComponent, lightTheme } from './theme'
import ContentWrapper from './components/content-wrapper'
import 'katex/dist/katex.min.css'
import Paper from './pages/paper'

const PageWrapper = styled.div`
	margin: 32px 0;
`

function App() {
  return (
	<ThemeProvider theme={lightTheme}>
		<GlobalStyleComponent />

		<PageWrapper>
			<ContentWrapper>
				<Paper/>
			</ContentWrapper>
		</PageWrapper>
		
		
	</ThemeProvider>
  )
}

export default App;
