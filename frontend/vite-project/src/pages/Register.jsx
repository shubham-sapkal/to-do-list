import React, { useContext, useState } from 'react'

import { Link, Navigate } from 'react-router-dom';

import axios from "axios";
import { Context, server } from '../main';

import toast from "react-hot-toast";

const Register = () => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const ctx = useContext(Context);

  const nameChangeHandler = event => {
    setName(event.target.value);
  }

  const emailChangeHandler = event => {
    setEmail(event.target.value);
  }

  const passwordChangeHandler = event => {
    setPassword(event.target.value);
  }

  const submitHandler = async (event) => {
    event.preventDefault();

    ctx.setIsLoading(true);

    // console.log(name + email + password);

    // Using backend API
    try {
        const { data } = await axios.post(`${server}/users/register`,{
          name,
          email,
          password
      }, 
      {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true,
      });

      // console.log("data = " + data);

      toast.success(data.message);

      ctx.setIsAuthenticated(true);

      ctx.setIsLoading(false);

    } catch(error) {
      toast.error(error.response.data.message);
      console.log(error);
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
        <form onSubmit={submitHandler}>
          <input type="text" value={name}  placeholder='Name' onChange={nameChangeHandler} />
          <input type="email" value={email} placeholder='Email' onChange={emailChangeHandler} />
          <input type="password" value={password} placeholder='Password' onChange={passwordChangeHandler} />
          <button type="submit" disabled={ctx.loading} >Sign Up</button>
          <h4>OR</h4>
          <Link to="/login">Sign In</Link>
        </form>
      </section>
    </div>
  )
}

export default Register