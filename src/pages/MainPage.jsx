import { useCreateTodo } from '../hooks/useCreateTodo'
import sort from '../assets/sort-by-alphabet_icon-icons.com_73407.svg'
import { useState, useRef } from 'react'
import { NavLink } from 'react-router-dom'
import { useGetTodos } from '../hooks/useGetTodos'


export function MainPage(){
	const [isSorted, setIsSorted] = useState(false)
	const [refresh, setRefresh] = useState(false)
	const {todos} = useGetTodos(refresh, isSorted)

	const [value, setValue] = useState('')
	const {createTodo} = useCreateTodo(refresh, setRefresh)
	const [isValidValue, setIsValidValue] = useState(false)
	const createTodoRef = useRef(null)

	const validation = ({target}) =>{
		if(target.value.length>=5){
			setIsValidValue(true)
		}
		else{
			setIsValidValue(false)
		}
	}

	const search = ({target}) =>{
		setValue(target.value)
	}

  return (
	<main>
		<div className='formContainer'>
			<form className='inputContainer' onSubmit={()=>{createTodo(event, createTodoRef.current.value);createTodoRef.current.value='';setIsValidValue(false)}}>
				<input onChange={validation} ref={createTodoRef} type="text" placeholder='Создать новую задачу (не менее 5 символов)'/>
				<button disabled={!isValidValue} className='createTodo'>+</button>
			</form>
			<div className='inputContainer'>
				<input onChange={search} value={value} type="text" placeholder='Поиск'/>
				<button onClick={()=>setIsSorted(!isSorted)} style={isSorted?{backgroundColor: 'rgba(0, 0, 0, 0.4)'}: null} className='searchTodo'><img className='sortImg' src={sort} alt="sort"/></button>
			</div>
		</div>

		<ul className='TodosList'>
		{todos.map(({id, title, completed})=>{
			if(title.toLowerCase().includes(value.toLowerCase().trim())){
				return <li className='todo' style={{borderLeft: `4px solid ${completed ? 'green' : 'red'}`}} key={id}>
					<p className='title'><NavLink to={`task/${id}`}>{title}</NavLink></p>
				</li>
			}
		}
		)}
		</ul>
	</main>
  )
}