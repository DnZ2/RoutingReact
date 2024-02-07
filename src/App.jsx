import './App.css'
import { MainPage } from './pages/MainPage'
import { TodoPage } from './pages/TodoPage'
import { NotFound } from './pages/errorPage/NotFound'
import { Routes, Route } from 'react-router-dom'
import TaskNotFound from './pages/errorPage/TaskNotFound'

function App() {

	return (
	<Routes>
		<Route path='/' element={<MainPage/>}/>
		<Route path='task/:taskId' element={<TodoPage/>}/>
		<Route path="*" element={<NotFound />} />
		<Route path='/404' element={<TaskNotFound/>}/>
	</Routes>
  )
}

export default App
