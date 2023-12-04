import { lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
import './assets/styles/index.scss'
import Layout from './components/layout/Layout'
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'))
const Operations = lazy(() => import('./pages/Operations'))
const Options = lazy(() => import('./pages/Options.jsx'))
const NewOperation = lazy(() => import('./pages/NewOperation'))
const EditOperation = lazy(() => import('./pages/EditOperation'))

const App = () => {
	return (
		<>
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route index element={<Operations />} />
					<Route path="/:add-new-operation" element={<NewOperation />}></Route>
					<Route path="/:edit-operation" element={<EditOperation />}></Route>
					<Route path="/:options" element={<Options />}></Route>
					<Route path="*" element={<NotFoundPage />} />
				</Route>
			</Routes>
		</>
	)
}

export default App
