import React, {useEffect, useState} from 'react'
import  Axios  from 'axios';

import {NavLink, useHistory} from 'react-router-dom'

function SignUp() {
 let [email, setEmail] = useState('')
 let [password, setPassword] = useState('')
 const[userName, setUsername] =useState("")
 const [loginMsgActivation, setLoginMsgActivation] = useState(false)
 const [loginMsg, setLoginMsg] = useState("")
 const [duplicateErrorMsg, setDupErrMsg]= useState("")
 const [badReq, setBadReq]= useState(true)
 let addEmail = e=> setEmail(e.target.value)
 let addPassword = e=> setPassword(e.target.value)




const handleSignUP=()=>{
  Axios.post(`http://localhost:3500/signUp`,{
    email:email,
    password:password,
    userName:userName,
    time:new Date().toLocaleString()
  }).then((response, rows)=>{
    console.log(response);
    
    setLoginMsg(response.data.msg)
    setBadReq(false)
  }).catch((err)=>{
    console.log(err);
   
    setDupErrMsg(err.response.data.error)
  })
  setLoginMsgActivation(true)
  setEmail("")
  setPassword("")
  setUsername("")
}

const takeUsername = e=>setUsername(e.target.value)
const isButtonActive = ()=>{
  return email !=="" && password !== ""&& userName!== ""
}
  return (
    <div id='signUp'>
  <h3 id='Already'>Already have an account. Login to continue</h3>
 <NavLink to='/login' id='loginNavlink'>Login</NavLink>
       <div id='labelAlign'>
        <p>Email:</p>
       <input type="text" onChange={addEmail} />
       </div>
       
    
     <div id='labelAlign'>
      <p>Password</p>
      <input type="text" value= {password} onChange={addPassword}/>
     </div>

 <div id="labelAlign">    
 <p>Username</p>
 <input  type="text" value={userName} onChange={takeUsername} />

 </div>

 <button id='join' disabled={!isButtonActive()} onClick={handleSignUP}>Join Now</button>
 {!badReq &&
  <div id='loginMsg'>
    <h3 style={{color:"red"}}>{loginMsg}</h3>
    <NavLink to='/login' id='loginNavlink'>Login</NavLink>
  </div>
 }
 {duplicateErrorMsg &&
 <div id='loginMsg'>
 <h3 style={{color:"red"}}>{duplicateErrorMsg}</h3>
</div>
 }

 
    </div>
  )
}

export default SignUp
