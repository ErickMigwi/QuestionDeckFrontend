import React,{useState, useEffect} from 'react'
import  Axios  from 'axios'
import { NavLink } from 'react-router-dom'

function EditProfile() {
  Axios.defaults.withCredentials = true
  const [username, setUserName] = useState("")
  const [age, setAge] = useState("")
  const [location, setLocation] = useState("")
  const [email, setEmail] = useState("")
  const [aboutMe ,setAboutMe] = useState("")
  const [whatI_Do, setWhatI_Do] = useState("")
  const [userId, setUserId] = useState("")
  const [isAuthenticated, setAuthenticated] = useState(false)
  const [showSuccessMsg, setSuccessMsg] =useState(false)
  const [userImage, setUserImage] = useState(null)
  const takeInputName = e=>setUserName(e.target.value)
  const takeInputAge = e=>setAge(e.target.value)
  const takeInputEmail = e=>setEmail(e.target.value)
  const takeInputWhatYouDO = e=>setWhatI_Do(e.target.value)
  const takeInputLocation = e=>setLocation(e.target.value)
  const takeInputAboutMe = e=>setAboutMe(e.target.value)

 
  useEffect(()=>{
    Axios.get('http://localhost:3500/login').then(response=>{
      console.log(response);
      setAuthenticated(response.data.LoggedIn)
      setUserName(response.data.user[0].username)
      setUserId(response.data.user[0].idusers)
      setAge(response.data.user[0].age)
      setLocation(response.data.user[0].location)
      setWhatI_Do(response.data.user[0].profession)
      setAboutMe(response.data.user[0].AboutMe)
      setEmail(response.data.user[0].findMeOn)
      
    })
    
  }, [])
  const editProfile =  ()=>{
    
    Axios.post("http://localhost:3500/updateUser", {
      username:username,
      age:age,
      location:location,
      userId:userId,
      findMeOn:email,
      whatI_Do:whatI_Do,
      aboutMe:aboutMe,
     userImage
      
    }).then(response=>{
      console.log(response);
      setSuccessMsg(true)
    }).catch(err=>{
      console.log(err);
    })
  }
  return (  
  <>  
      {isAuthenticated? (
      <>
      <div id='mainEditPg'>
      <h1>Edit your profile</h1>
       <h2>Edit Your Details</h2>
      
       <div id='setToAlign'> 
        <p id='lablesOfInput'>Username: </p>
        <input onChange={takeInputName} id='editInput' type="text" value={username}  required/>
       </div>
       <div id='setToAlign'>
        <p id='lablesOfInput'>Age: </p>
        <input onChange={takeInputAge} id='editInput' type="text" value={age}  name='Age'/>
       </div>
       <div id='setToAlign'>
        <p id='lablesOfInput'>Location: </p>
        <input onChange={takeInputLocation} id='editInput' type="text" value={location}/>
       </div>
       <div id='setToAlign'>
        
        <p id='lablesOfInput'>Find Me On</p>
        <input onChange={takeInputEmail}  id='editInput'  type="email" placeholder='name@gmail.com' value={email} />
       </div>
       
       <div  id='setToAlign'>
        <p id='lablesOfInput'>What you Do</p>
        <input  onChange={takeInputWhatYouDO} id='editInput' type="text" placeholder='Am A JavaScript Dev' value={whatI_Do} />
       </div>
       <div id='setToAlign'>
        <p id='lablesOfInput'>About Me: </p>
        <textarea value={aboutMe} name="" id="editTextArea" cols="60" rows='4'  placeholder='I am a passionate and experienced full-stack web developer with expertise in both front-end and back-end technologies. With a strong foundation in web development principles and a keen eye for design, I strive to create robust and user-friendly web applications.' onChange={takeInputAboutMe}></textarea>
       </div>
       <div id="setToAlign">
       <NavLink to='/editImage'>Edit Image</NavLink>
       
       </div>
        <button id='NavBtn' onClick={editProfile} >Edit Profile</button>
     
      
       {showSuccessMsg && 
        <div id='editProfileSuccess'>
          <h4>Profile edited successfully</h4>
          <NavLink to='/profile'>Go to Profile page</NavLink>
         
        </div>
       }
    </div>
      </>            
      ):(
        <div id='notLogged'>
        <h1>You are not Logged in</h1>
        <div id='notLoggedNavlinks'>
        <NavLink id='NavBtn' to='/login'>Login</NavLink>
        <NavLink id='NavBtn' to='/'>Join Now</NavLink>
        </div>
      </div>
      )}
    
  </>
   
  )
}

export default EditProfile
