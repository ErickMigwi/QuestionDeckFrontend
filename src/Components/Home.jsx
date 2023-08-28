import  Axios  from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { NavLink } from 'react-router-dom'
Axios.defaults.withCredentials = true
function Home() {
  const [isAuthenticated, setAuthenticated] = useState(false)
  useEffect(()=>{
    Axios.get('http://localhost:3500/login').then(response=>{
      console.log(response);
      if(response.data.LoggedIn){
        setAuthenticated(true)
      }
    })
 
  }, [])
  return (
    <div>
    {isAuthenticated? (
        <div id="containerHome">
        <div id="haveAQustion">
      <h1 id='Q'>HAVE A QUESTION?</h1>
      <p id='guide'>If you have any question you can ask below or enter what you are looking for!</p>
      </div>
      {/* <div id='search'>
      <input type="text" placeholder='Type your search terms here' />
      <button>Search</button>
      </div> */}
      </div>
    ):(
      <div id='notLogged'>
        <h1>You are not Logged in</h1>
        <div id='notLoggedNavlinks'>
        <NavLink id='NavBtn' to='/login'>Login</NavLink>
        <NavLink id='NavBtn' to='/'>Join Now</NavLink>
        </div>
      </div>
    )}
      
    </div>
  )
}

export default Home
