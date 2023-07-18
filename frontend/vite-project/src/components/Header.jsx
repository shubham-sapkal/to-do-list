import React, { useContext } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { Context } from '../main';

import { toast } from 'react-hot-toast';

import { server } from '../main';

import axios from 'axios';

const Header = () => {

    const ctx = useContext(Context);

    // console.log("is Auth = " + isAuthenticated);

    const logoutHandler = async () => {
        
      ctx.setIsLoading(true);

        try {
          const { data } = await axios.get( 
            `${server}/users/logout`,
            {
              withCredentials: true,
            }
          );
    
          toast.success("Logout Successfully!");
    
          ctx.setIsAuthenticated(false);
            
          ctx.setIsLoading(false);
        } catch (error) {
          // console.log("Login Error: " + error);
          toast.error(error.response.data.message);
          ctx.setIsAuthenticated(true);
          ctx.setIsLoading(true);
        }
    
    }

    // if(ctx.isAuthenticated) {
    //     return <Navigate to={"/"} />
    // }


  return (
    <nav className='header'>
        <div>
            <h2>Todo APP</h2>
        </div>

        <article>
            <Link to={"/"} >
                Home
            </Link>
            <Link to={"/profile"} >
                Profile
            </Link>
            { !ctx.isAuthenticated
                ? ( <Link to={"/login"} > Login </Link>  )
                : ( <button  className='btn' disabled={ctx.loading} onClick={logoutHandler}>logout</button> )
            }
        </article>
    </nav>
  )
}

export default Header