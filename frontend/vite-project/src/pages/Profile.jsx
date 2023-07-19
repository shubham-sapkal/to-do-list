import React, { useContext } from 'react'
import { Context } from '../main'
import Loader from '../components/Loader';

import { Navigate } from 'react-router-dom';

const Profile = () => {

  const ctx = useContext(Context);

  console.log(ctx.user);

  if( !ctx.isAuthenticated ){
    return <Navigate to="/login"  />
  }

  return (
    ctx.loading 
      ? ( <Loader /> )
      : ( <div>
            <h1>{ ctx.user?.name }</h1>
            <p>{  ctx.user?.email}</p>
          </div>
      ) 
  )
}

export default Profile