import React, { useEffect, useState } from 'react';
import  Axios  from 'axios';
import { NavLink, useNavigate, Link } from 'react-router-dom';
import {ThreeCircles} from 'react-loader-spinner'
import {faPenToSquare}   from '@fortawesome/free-solid-svg-icons';
import {faTrashCan} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
Axios.defaults.withCredentials = true
function QuestionsList() {
  const [questions, setQuestions] = useState(null)
  const [questionId , setQuestionId] = useState(null)
  const [isAuthenticated, setAuthenticated]= useState(false)
  const [visibleQuestions, setVisibleQuestions]  = useState(5)
  const [numberOfQuestions, setNumberOfQuestions] = useState(null)
  const [showLess, setShowLess] = useState(false)
  const [Loading, setLoading] = useState(null)
  const [delEditOpt, setdelEditOpt] = useState(null)
  const [userId, setUserId] = useState(null)
  const [showDelSucc, setshowDelSucc] =useState(null)
  const [showEditInp, setShowEditInp]= useState(false)
  const [editId, setEditId ] = useState(null)
  const [editQuestion, setEditQuestion] = useState(null)
  const navigate = useNavigate()

  useEffect(()=>{
    Axios.get(`http://localhost:3500/login`).then(response=>{
      console.log(response);
      if(response){
        setAuthenticated(response.data.LoggedIn)
        setUserId(response.data.user[0].idusers)
      }
   
    })
  }, [userId])
  const fetchData= async()=>{
    try{
    setLoading(true)
    const response = await Axios.get('http://localhost:3500/getQuestions')
    console.log(response);
       let questions = await response.data.questions
       if(questions){
         setQuestions(questions)
         console.log(questions);
         const num = questions.length
         setNumberOfQuestions(num)
         console.log(numberOfQuestions);
         
   }
  }
  catch(err){
    console.log(err);
  }finally{
    setLoading(false)
  }
}
 
 
 
useEffect(()=>{
  if(visibleQuestions<10){
    setShowLess(false)
  }else if(visibleQuestions>=10){
    setShowLess(true)
  }
  fetchData()
}, [visibleQuestions])

 const handleAnswer = (id)=>{
 localStorage.setItem('quesionId', JSON.stringify(id))
  navigate('/answer');
 }
 const loadMore = ()=>{
  setVisibleQuestions(prev=> prev+5)
 
 }
 const ShowLess = ()=>{
  setVisibleQuestions(prev => prev-5)
  console.log(visibleQuestions);
  
  
 }
 const delQuestion = (id)=>{
  let Id = id
  Axios.delete('http://localhost:3500/delQuestion', {
    params:{
      questionId:Id
    }
  }).then(response=>{
    setshowDelSucc(true)
    setTimeout(()=>{setshowDelSucc(false)}, 2000)
    console.log(response);
    fetchData()
  }).catch(err=>{
    console.log(err);
  })
 }
 const showEdit = (id)=>{
  console.log(id);
  setEditId(id)
  const Id = id
    setShowEditInp(!showEditInp)
  
 }
const takeEdit = (e)=>setEditQuestion(e.target.value)
const updateQues = (id)=>{
  Axios.put('http://localhost:3500/updateQuestion', {
  idquestions:id,
  question:editQuestion
  }).then(response=>{
    console.log(response)
    setShowEditInp(false)
    fetchData()
  }).catch(err=>{
    console.log(err);
  })
}
  return (
<>
{Loading ? (
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
  <>
  {isAuthenticated ? (
   <div id='askedQuestions'>
   <h1 id='headingQuestionAsked'>Questions Asked</h1>
   {showDelSucc && 
   <div id="delSucc">
    <p>Question Deleted Successfully</p>
   </div>
   }
    {questions && questions.slice(0, visibleQuestions).map(data=>{
    return(
      <div id='answerQuestion' key={data.idquestions}>
        <div id='mappedQuestions'>
          <ul>
        <li> <p id='fontQuestions'>{data.questions}</p></li>
    
        <button id='showAnwers' onClick={()=>handleAnswer(data.idquestions)}>Show Answers</button>
          </ul>
          {data.idusers===userId&&
        <div id='optDiv'>
        <button id='optsBtn' onClick={()=>delQuestion(data.idquestions)}><FontAwesomeIcon className='optionsQuesDel' icon={faTrashCan} /></button>
        <button id='optsBtn' onClick={()=>showEdit(data.idquestions)}><FontAwesomeIcon className='optionsQuesEdit' icon={faPenToSquare} /></button>
        </div>
        }
        {showEditInp && editId===data.idquestions &&
        <div>
          <input type="text"  onChange={takeEdit}/>
          <button onClick={()=>updateQues(data.idquestions)}>Publish question</button>
        </div>
        }
        </div>
        <div id='answerQuestionBtn'>
       
        <button id='answerBtn' onClick={()=>handleAnswer(data.idquestions)}>Answer Question</button>
        </div>
      </div>
    )
    })}
    {visibleQuestions<numberOfQuestions && (
      <button id='showMore' onClick={loadMore}>Show More</button>
    )}
    {showLess && 
    <button id='ShowLessBtn' onClick={ShowLess}>Show Less</button>
    }
 </div>
): (
  <div>
    <div id='notLogged'>
        <h1>You are not Logged in</h1>
        <div id='notLoggedNavlinks'>
        <NavLink id='NavBtn' to='/login'>Login</NavLink>
        <NavLink id='NavBtn' to='/'>Join Now</NavLink>
        </div>
      </div>
  </div>
)}
  </>
)}
</>
  );
}

export default QuestionsList;