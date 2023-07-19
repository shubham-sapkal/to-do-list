import React, { useContext, useState } from 'react'

import {Link, Navigate} from "react-router-dom";
import { server, Context } from '../main';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const Login = () => {

  const ctx = useContext(Context);

  const [ email, setEmail ] = useState("");
  const [ password, setPassword] = useState("");

  const emailChangeHandler = event => {
    setEmail(event.target.value);
  }

  const passwordChangeHandler = event => {
    setPassword(event.target.value);
  }

  const submitHandler = async (event) => {
    event.preventDefault();

    ctx.setIsLoading(true);

    try {
      const { data }= await axios.post( 
        `${server}/users/login`,
        {
          email,
          password
        },
        {
          headers: {
            "Content-Type": "application/json"
          },
          withCredentials: true,
        }
      );

      toast.success(data.message);

      ctx.setIsAuthenticated(true);

      ctx.setIsLoading(false);

    } catch (error) {
      // console.log("Login Error: " + error);
      toast.error(error.response.data.message);
      ctx.setIsAuthenticated(false);
      ctx.setIsLoading(false);
    }

  }

  if(ctx.isAuthenticated) {
    return <Navigate to={"/"} />
  }

  return (
    <div className="login">
      <section>
        <form onSubmit={submitHandler} >
          <input type="email" value={email}  placeholder='Email' onChange={emailChangeHandler}/>
          <input type="password" value={password} placeholder='Password' onChange={passwordChangeHandler} />
          <button type="submit">Sign In</button>
          <h4>OR</h4>
          <Link to="/register">Sign Up</Link>
        </form>
      </section>
    </div>
  )
}

export default Login