import React from 'react'
import { NavLink } from 'react-router-dom'
function NavBar() {
  
  
  return (
    <div id='mainNavPage'>   
     <div id='navBar'>
      <div id='nav'>
      <NavLink id='navLink' to= '/home'>HOME</NavLink>
      <NavLink id='navLink' to= '/Blog'>BLOG</NavLink>
      </div>
      <div id='nav'>

        <NavLink id='navLink' to='/'>REGISTER</NavLink>
        <NavLink id='navLink' to='/profile'>PROFILE</NavLink>
      </div>
      
    </div>
    <div id="navBar2">
    <div id='name'>
    <h1 id='nameofWebApp'>QuestionDeck</h1>
    <p id='AboutWebApp'>Q&A Dashboard Template</p>
   </div>
      <div id="howItWorks">
        <NavLink id='browseQuestions' to ='/questionAsked'>Browse Questions</NavLink>
        <NavLink id='Post' to ='/postQuestion'>Post Question</NavLink>
      </div>
      </div>

    </div>

  )
}

export default NavBar
