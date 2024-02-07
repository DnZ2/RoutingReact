import { useParams, NavLink } from 'react-router-dom'
import { Task } from '../components/Task'
import { useState, useEffect } from 'react';
import { useToggleCompleted } from '../hooks/useToggleCompleted'
import { useDeleteTodo } from '../hooks/useDeleteTodo'
import { useEditTodo } from '../hooks/useEditTodo'
import TaskNotFound from './errorPage/TaskNotFound';

export function TodoPage(){
	const [refresh, setRefresh] = useState(false)
	const {deleteTodo} = useDeleteTodo()
	const {editTodo} = useEditTodo(refresh, setRefresh)
	const {toggleCompleted} = useToggleCompleted(refresh, setRefresh)
	const {taskId} = useParams()
	const [todo, setTodo] = useState({})
	const [error404, setError404] = useState(false)
	useEffect(()=>{
		setError404(false)
		fetch(`http://localhost:3000/todos/${taskId}`)
		.then(res=>res.json())
		.then(data=>setTodo(data))
		.catch(()=>setError404(true))
	},[taskId, refresh])

	const {id, title, completed} = todo

	if(error404){
		return <TaskNotFound />
	}

	return(
		<div className='containerTodo'>
		<Task
		id={id}
		title={title}
		completed={completed}
		deleteTodo={deleteTodo}
		editTodo={editTodo}
		updateStatus={toggleCompleted}
		/>
		<NavLink className="back" to={-1}>Назад</NavLink>
		</div>
	)
}
