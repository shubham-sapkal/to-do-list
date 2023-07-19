import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'

// import axios from 'axios';

import { Context, server } from '../main';
import { toast } from 'react-hot-toast';
import TodoItem from '../components/TodoItem';
import { Navigate } from 'react-router-dom';

const Home = () => {

  const { isAuthenticated } = useContext(Context);

  const [ title, setTitle ] = useState("");
  const [ description, setDescription] = useState("");
  const [ loading, setLoading ] = useState(false);

  const [ tasks, setTasks] = useState([] );

  const [refresh, setRefresh] = useState(false);
  

  const submitHandler = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);
      const { data} = await axios.post(
        `${server}/task/new`,
        {
            title,
            description
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      toast.success(data?.message);

      setTitle("");
      setDescription("");

      setLoading(false);

      setRefresh(prev => !prev);

    } catch ( error ) {
      toast.error(error.response.data.message);
      setLoading(false);
    }

  }

  const updateHandler = async (id) => {
    
    try {
      const { data } = await axios.put(
        `${server}/task/${id}`,
        { },
        {
          withCredentials: true
        }
      );

      toast.success(data.message);
      setRefresh(prev => !prev);

    } catch(error) {
      toast.error(error.response.data.message);
    }


  }

  const deleteHandler = async(id) => {
    try {
      const { data } = await axios.delete(
        `${server}/task/${id}`,
        {
          withCredentials: true
        }
      );

      toast.success(data.message);
      setRefresh(prev => !prev);

    } catch(error) {
      toast.error(error.response.data.message);
    }
  }


  useEffect( ()=> {

      axios.get(
        `${server}/task/all`,
        {
          withCredentials: true
        }
      )
      .then( res => {
        // console.log(res.data.tasks);
        setTasks(res.data.tasks);
      })
      .catch( err => {
        toast.error(err.response.data.message);
      });

  }, [refresh]  )

  if( !isAuthenticated ){
    return <Navigate to="/login"  />
  }


  return (
    <div className="container">

        <div className="login">
          <section>
            <form onSubmit={submitHandler} >
              <input type="text" value={title}  placeholder='Title' onChange={ (event) => { setTitle(event.target.value) } }/>
              <input type="text" value={description}  placeholder='Description' onChange={ (event) => { setDescription(event.target.value) } }/>
              <button disabled={loading} type="submit">Add Task</button>
            </form>
          </section>
        </div>

      <section className="todosContainer">
          {
            tasks?.map( (task) => (
              <TodoItem 
                id={task._id}
                key={task._id}
                title={task.title}
                description={task.description}
                isCompleted={task.isCompleted}
                onUpdate={updateHandler}
                onDelete={deleteHandler}
                />
            ))
          }
      </section>

    </div>
  )
}

export default Home