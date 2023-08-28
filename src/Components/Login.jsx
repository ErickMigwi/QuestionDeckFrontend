import React, { useEffect, useState } from 'react'
import  Axios  from 'axios'
import { NavLink, useNavigate } from 'react-router-dom'
function Login() {
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [errorMsg, setErrorMsg] = useState("")
  const [showErrorMsg, setShowErroMsg] = useState(false)
  const [SuccessMsg, setSuccessMsg] = useState("")

 const navigate = useNavigate()
let  handleEmail = e=>setEmail(e.target.value)
  let handlePassword = e => setPassword(e.target.value)
 Axios.defaults.withCredentials = true
  const login = ()=>{
    setShowErroMsg(false)
    
   Axios.post('http://localhost:3500/login', {
    email:email,
    password:password
   }).then((response)=>{
    console.log(response.data.msg);
    setSuccessMsg(response.data.msg)
    navigate("/home")
   }).catch(err=>{
    if(err.response.data.message){
    setErrorMsg(err.response.data.message)
    console.log(errorMsg);
  }
   console.log(err);
    setShowErroMsg(true)
   })
  };
  useEffect(()=>{
    Axios.get('http://localhost:3500/login').then(response=>{
      console.log(response);
    })
    
  }, [])
  const buttonActive = ()=>{
    return email !== "" && password !== ""
  }
  return (
    <div id='login'>
      <div id="loginHeader">
      <h1>Login</h1>
      </div>
      <div id="loginDetails">
        <div id='alignH-Inp'>
          <p id='userName'>Email: </p>
       <input type="text" onChange={handleEmail} placeholder='Email' />
       </div>
       <div id='alignH-Inp'>
       <p id='userName'>Password:  </p>
        <input type="text" onChange={handlePassword} placeholder='Password' />
        </div>
      </div>
     <div id="submitLogin">
      <button id='loginBtn' disabled={!buttonActive()} onClick={login}>Login</button>
     </div>
     {showErrorMsg &&
     <div id='loginMsg'>
      <h3 style={{color:'red'}}>{errorMsg}</h3>
     </div>
     }
     {SuccessMsg && 
     <div  id='loginMsg'>
        <h3 style={{color:'green'}}>{SuccessMsg}</h3>
        <NavLink isActive= {true} to='/'>Home</NavLink>
     </div>
     }
    </div>
  )
}

export default Login
