import React from 'react'

const TodoItem = (props) => {
  return (
    <div className='todo'>
        <div>
            <h4>{props.title}</h4>
            <p>{props.description}</p>
        </div>
        <div>
            <input onChange={ () => props.onUpdate(props.id)  } type="checkbox" checked={props.isCompleted} />
            <button onClick={ () => props.onDelete(props.id )} className='btn'>DELETE</button>
        </div>
    </div>
  )
}

export default TodoItem