import React, {useEffect, useState} from 'react'
import  Axios  from 'axios'
import { NavLink } from 'react-router-dom'
Axios.defaults.withCredentials = true
function EditImg() {
  const [isAuthenticated, setAuthenticated]= useState(false)
    const [userId, setUserId] = useState(null)
  useEffect(()=>{
  Axios.get('http://localhost:3500/login').then(response=>{
    console.log(response);
    setAuthenticated(response.data.LoggedIn)
    setUserId(response.data.user[0].idusers)
    console.log(userId);
    console.log(isAuthenticated);
  }).catch(err=>{
    console.log(err);
  })
  }, [])
    const [image, setImage] = useState(null)
    
    const takeImage = (event)=>{
      const value = event.target.files[0]
    setImage(value)
    }
    const handleSubmitForm = async (event) => {
      event.preventDefault();
      console.log(image);
      if (!image) {
        console.log('No selected file');
        return;
      }
      const formData = new FormData();
      formData.append('image', image);
      formData.append('userId', userId)
      try {
        await Axios.post('http://localhost:3500/uploadImage', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
      } catch (err) {
        console.log(err);
      }
    };
    
  return (
    <div>
       {isAuthenticated ? (
        <>
        <h1>Edit Image Component</h1>
       <form onSubmit={handleSubmitForm}>
        <label htmlFor="">Enter Image:
        <input type='file'  onChange={takeImage}/>
        </label>
        <button type='submit'>Submit</button>
       </form>
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
    </div>
  )
}

export default EditImg
