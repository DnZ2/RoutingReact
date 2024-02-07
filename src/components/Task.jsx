import PropTypes from 'prop-types';
import tick from '../assets/icons8-tick.svg'
import cross from '../assets/icons8-cross-26.png'
import edit from '../assets/edit-svgrepo-com.svg'
import remove from '../assets/garbage-trash-svgrepo-com.svg'
import '../App.css'
import { useState, useRef } from 'react';

export function Task({id, title, completed, updateStatus, deleteTodo, editTodo}){
	const [isOpenEditingField, setIsOpenEditingField] = useState(false)
	const [isOpenDeletingField, setIsOpenDeletingField] = useState(false)

	const [isValidValue, setIsValidValue] = useState(false)

	const inputRef = useRef(null)
	Task.propTypes={
		id: PropTypes.string,
		title: PropTypes.string,
		completed: PropTypes.bool,
		updateStatus: PropTypes.func,
		deleteTodo: PropTypes.func,
		editTodo: PropTypes.func,
	}

	const validation = ({target}) =>{
		if(target.value.length>=5){
			setIsValidValue(true)
		}
		else{
			setIsValidValue(false)
		}
	}

	return(
		<div className='todoTask' style={{borderLeft: `4px solid ${completed ? 'green' : 'red'}`}}>
			{isOpenEditingField
			? <input onChange={validation} ref={inputRef} className='editField' placeholder='Не менее 5 символов'/>
			:<p className='titleTask'>{title}</p>
			}
			{
			isOpenDeletingField
			? <div className='dialogControls'>
					<button onClick={()=>{deleteTodo(id)}}>Удалить</button>
					<button onClick={()=>setIsOpenDeletingField(false)}>Отмена</button>
			</div>
			: isOpenEditingField
			? <div className='dialogControls'>
					<button disabled={!isValidValue} onClick={()=>{editTodo(inputRef.current.value ,id);setIsOpenEditingField(false);setIsValidValue(false)}}>Изменить</button>
					<button onClick={()=>{setIsOpenEditingField(false);setIsValidValue(false)}}>Отмена</button>
			</div>
			:<div className='controls'>
				<img className='isCompletedToggle' src={completed? tick : cross} alt="completed" onClick={()=>{updateStatus(completed, id)}} />
				<img className='isHovered' src={edit} alt="edit" onClick={()=>{setIsOpenEditingField(true)}} />
				<img className='isHovered' src={remove} alt="delete" onClick={()=>{setIsOpenDeletingField(true)}} />
			</div>
			}
		</div>
	)
}
