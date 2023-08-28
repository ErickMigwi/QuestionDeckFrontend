import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { NavLink } from 'react-router-dom';
import {TailSpin} from 'react-loader-spinner'
import {ThreeDots} from 'react-loader-spinner'
import {ThreeCircles} from 'react-loader-spinner'

function Profile() {
  Axios.defaults.withCredentials = true
  const [userName, setUserName] = useState("")
  const [since, setSince] = useState("")
  const [isAuthenticated, setAuthenticated]= useState("")
  const [userId, setUserId] = useState(null)
  const [age, setAge] = useState(null)
  const [location, setLocation] = useState('')
  const [findMeOn, setFindMeOn] = useState("")
  const [AboutMe, setAboutMe] = useState('')
  const [profession, setProffession] = useState("")
  const [userImage, setUserImage] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  
   useEffect( ()=>{
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await Axios.get("http://localhost:3500/login");
        console.log(response);
        setAuthenticated(response.data.LoggedIn);
        console.log(userName);
        setSince(response.data.user[0].created_at);
        setUserId(response.data.user[0].idusers);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData()
    // Call the fetchData function when needed, such as in a useEffect hook or event handler.
    
   
     Axios.get('http://localhost:3500/getUserDetails', {
      params:{
        userId:userId
      }
     }).then(response=>{
     
      console.log(response.data[0].username);
       setSince(response.data[0].created_at)
        setUserName(response.data[0].username)
       setUserId(response.data[0].idusers)
       setAge(response.data[0].age)
       setLocation(response.data[0].location)
       setFindMeOn(response.data[0].findMeOn)
      setAboutMe(response.data[0].AboutMe)
       setProffession(response.data[0].profession)
      if (response.data[0].userImage) {
        const uint8Array = new Uint8Array(response.data[0].userImage.data);
        const longBlob = new Blob([uint8Array], { type: 'image/jpeg' });
        setUserImage(URL.createObjectURL(longBlob));
      }
       
 
      // console.log(response);
     }).catch(err=>{
      console.log(err);
     })
    Axios.get('http://localhost:3500/getQuestionsProfile',{
      params:{
        userId:userId
      }
    }).then(response=>{
      console.log(response);
    }).catch(err=>{
      console.log(err);
    })
   }, [userId, userName, AboutMe])
  
  return (
<div id='mainProfilePage'>
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
    <div id='mainProfile'>{isAuthenticated ?(
      <div id='mainProf'> 
       <div id='editBtn'>
      <NavLink id='navEdit' to='/editProfile'>Edit Profile</NavLink>
      </div> 
      <div id='headingProfile'>
      <h2 id='details'>{profession}</h2>

      </div>

      <div id='usersMainProperties'>
      <div id='personalImage'>
       <img id='sizeImg' src={userImage} alt="" srcset="" />
      </div>
      </div>
      <div id='usersMainProperties'>
      <h3>User: {userName}</h3>
      <h4>Location: {location} </h4>
      <h4>Since: {since}</h4>
      <h4>Find Me On: <a href={`mailto:${findMeOn}`}>{findMeOn}</a></h4>
      </div>
     
      <div id='aboutMe'>
       <h2> About me:</h2>
       <p>{AboutMe}</p>
      </div>
     
      </div>
    ):(
      <div id='notLogged'>
      <h1>You are not Logged in</h1>
      <div id='notLoggedNavlinks'>
      <NavLink id='NavBtn' to='/login'>Login</NavLink>
      <NavLink id='NavBtn' to='/'>Join Now</NavLink>
      </div>
    </div>
    )
       }
     
     </div>
  )}
</div>
  );
}

export default Profile;