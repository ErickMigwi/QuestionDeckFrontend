import React,{useEffect, useState} from 'react'
import  Axios  from 'axios'
import { NavLink } from 'react-router-dom'
import { ThreeCircles } from 'react-loader-spinner'
function PostQuestion() {
const [category, setCategory] = useState("")
const [description, setDescription] = useState("")
const [isAuthenticated, setAuthenticated] = useState(false)
const [userId, setUserId] = useState(null)
const [showSuccessMsg, setShowSuccessMsg] = useState(false)
const [successMsg, setSuccessMsg] = useState('')
const [isLoading, setIsLoading] = useState(false)
Axios.defaults.withCredentials = true
let addCategory = e=>setCategory(e.target.value)
let addDescription = e=>setDescription(e.target.value)
useEffect(()=>{
  const postQuestion = async()=>{
    try{
      setIsLoading(true)
      const response = await Axios.get("http://localhost:3500/login")
      
    if(response.data.LoggedIn){
      setAuthenticated(true)
      const id = await response.data.user[0].idusers;
       setUserId(id);
      console.log(userId);
 
    }
    }catch(err){
      console.log(err);
    }finally{
  setIsLoading(false)
    }
  }
 postQuestion()

}, [userId])

const publishQuestion = ()=>{
  console.log(category);
  Axios.post("http://localhost:3500/postQuestion", {
   question:description,
   category:category,
   userId:userId
  }).then(response=>{
    console.log(response);
    setShowSuccessMsg(true)
   
    setSuccessMsg(response.data.msg)
    setTimeout(()=>{
 setShowSuccessMsg(false)
    }, 3500)
  })
 
}
  return (<>
      {isLoading ? (
         <div id='tailSpin'>
         <ThreeCircles
          height="100"
          width="100"
          color="#BE161E"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
          ariaLabel="three-circles-rotating"
          outerCircleColor=""
          innerCircleColor=""
          middleCircleColor="#191919"
        />
              </div>
      ):(

        <div>

{isAuthenticated ? (
          <div id='postQuestion'>
          <h1 id='addQuestion'>ADD QUESTION</h1>
          
          <div id="questionTitle">
            <h3>Question Category</h3>
           <select onChange={addCategory} name="" id="select">
           <option value="Technology">Technology</option>
           <option value="Farming">Farming</option>
           <option value="Medicine">Medcine</option>
           <option value="Electricity">Electricity</option>
           <option value="Engineering">Engineering</option>
           </select>
            <h6>Add your Category here</h6>
          </div>
          <div id="questionTitle">
            <h3>Question Description</h3>
            <input onChange={addDescription} type="text" />
            <h6>Add your question description</h6>
          </div>
          <button id='publishQuestion' onClick={publishQuestion}>Publish Your Question</button>
          {showSuccessMsg && 
      <div id='postQuestionSuccessMsg'>
        <p>{successMsg}</p>
      </div>
      }
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
      )}
    
    </>
  )
}

export default PostQuestion
