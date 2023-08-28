import React, {useState} from 'react';
import './App.css';
import Home from './Components/Home'
import NavBar from './Components/NavBar'
import { Routes, Route  } from 'react-router-dom';
import Blog from './Components/Blog';
import Login from './Components/Login';
import SignUp from './Components/SignUp';
import Footer from './Components/Footer';
import PostQuestion from './Components/PostQuestion';
import QuestionAsked from './Components/QuestionAsked';
import Answer from './Components/Answer';
import  Axios  from 'axios';
import Profile from './Components/Profile';
import EditProfile from './Components/EditProfile';
import EditImg from './Components/EditImg';

function App() {
  Axios.defaults.withCredentials = true
const [navigation, setNavigation] =useState('')
Axios.get("http://localhost:3500/login").then((response)=>{
  console.log(response);
  if(response.data.LoggedIn){
    setNavigation("/home")
  }else{
    setNavigation("/")
  }
})
  return (
    
    <div className="App">
      
      <NavBar/>
      
    <Routes>
      <Route path='/home' element= {<Home/>}/>
      <Route path='/blog' element= {<Blog/>}/>
      <Route path='/login' element= {<Login/>}/>
      <Route path='/' element= {<SignUp/>}/>
      <Route path = '/postQuestion' element ={<PostQuestion/>}/>
      <Route path = '/questionAsked' element ={<QuestionAsked/>}/>
      <Route path = '/answer' element = {<Answer/>}/>
      <Route path = '/profile' element = {<Profile/>}/>
      <Route path='/editProfile' element = {<EditProfile/>}/>
      <Route path = '/editImage' element = {<EditImg/>}/>
    </Routes>
   
    </div>
  );
}

export default App;
