import * as React from 'react'
import { render } from 'react-dom'
import styled from 'styled-components'
import { createGlobalStyle } from 'styled-components'
import {
	HashRouter as Router,
	Switch,
	Route,
	Redirect,
} from 'react-router-dom'
import { Editor } from './pages/editor'
import { History } from './pages/history'
import { useStateWithStorage } from './hooks/use_state_with_storage'

//ページ全体に適用するスタイル
const GlobalStyle = createGlobalStyle`
	body * {
		box-sizing: border-box;
	}
`

const StorageKey = '/editor:text'

//useState を使うために、Main を関数化
const Main: React.FC = () => {
	const [text, setText] = useStateWithStorage('', StorageKey)

	return (
		<>
			<GlobalStyle />
			<Router>
				<Switch>
					<Route exact path="/editor">
						<Editor
							text={text}
							setText={setText}
						/>
					</Route>
					<Route exact path="/history">
						<History
							setText={setText}
						/>
					</Route>
					<Redirect to="/editor" path="*" />
				</Switch>
			</Router>
		</>
	)
}

render(<Main />, document.getElementById('app'))


