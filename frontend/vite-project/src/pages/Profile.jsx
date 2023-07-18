import React, { useContext } from 'react'
import { Context } from '../main'
import Loader from '../components/Loader';

const Profile = () => {

  const ctx = useContext(Context);

  console.log(ctx.user);

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