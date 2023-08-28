import React, { useEffect, useState } from 'react';
import  Axios  from 'axios';
import { NavLink } from 'react-router-dom';
import { ThreeCircles } from 'react-loader-spinner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faEllipsis} from '@fortawesome/free-solid-svg-icons';
import {faPenToSquare}   from '@fortawesome/free-solid-svg-icons';
import {faTrashCan} from '@fortawesome/free-solid-svg-icons';
import {faThumbsDown} from '@fortawesome/free-solid-svg-icons';
import {faThumbsUp} from '@fortawesome/free-solid-svg-icons';
Axios.defaults.withCredentials = true

function Answer(props) {
  const [question, setQuestion] = useState("")
  const [questionId, setQuestionId] = useState(null)
  const [isAuthenticated, setAuthentication] = useState(false)
  const [showAnswerField, setShowAnswerField] = useState(false)
  const [answer, setAnswer] = useState("")
  const [userId, setUserId] =useState(0)
  const [fetchedAns, setFetchedAns] = useState([])
  const [showFetchedAns, setShowFetchedAns] = useState(false)
  const [Loading, setLoading] = useState(null)
  const [userImage, setUserImage] = useState(null)
  const [visDelOrEdit, setVisDelOrEdit] = useState(false)
  const [ansUserId, setAnsUserId] = useState(null)
  const [visOpt, setVisOpt] = useState(null)
  const [specificBtn, setSpecificBtn] = useState(null)
  const [deleteAnsSuccessMsg, setDeleteAnsSuccessMsg] = useState(null)
  const [editMsg, setEditMsg] = useState(false)
  const [showEditInp, setshowEditInp] = useState(false)
  const [edit, setEdit] = useState(null)
  const [editId, setEditId] = useState(null)
  const [specificLike, setSpecificLike] = useState(null)
  const [idanswers, setIdAns]= useState(null)
  const [vote , setVote]=useState("")
  const [voteOnce, setVoteOnce] = useState(false)
 
  const checkAuthAndFetchAns =async()=>{
    try{
      setLoading(true)
      const response = await Axios.get('http://localhost:3500/login')
      console.log(response);
        setAuthentication(response.data.LoggedIn)
        if(response){
          let id =  response.data.user[0].idusers
          setUserId(id)
          console.log(id);
        }
        let Id = JSON.parse(localStorage.getItem("quesionId"))
        console.log(Id);
        
         Axios.get(`http://localhost:3500/specificQuesiton`, {
          params:{
            questionId:Id
          }
        }).then(response=>{
          console.log(response);
          setQuestion(response.data[0].questions)
          
        }).catch(err=>{
          console.log(err);
        })
     
        console.log(userId, ansUserId);
        if(userId && ansUserId){
          if(userId===ansUserId){
            setVisDelOrEdit(true)
            console.log(visDelOrEdit);
          }
        }
      
    }catch(err){
      console.log(err);
    }finally{
      setLoading(false)
    }
  }
  const fetchingAns= ()=>{
    let Id = JSON.parse(localStorage.getItem("quesionId"))
    
    Axios.get(`http://localhost:3500/getAnswers`,{
      params:{
        questionId:Id
      }
    }).then(response=>{
      setFetchedAns(response.data)
      if(response.data.length>0){
        setShowFetchedAns(true)
      }else{
        setShowFetchedAns(false)
      }
      setTimeout(() => {
        console.log(fetchedAns);
      
      }, 3000);
     
    }).catch(err=>{
      console.log(err);
    
    })
   }

 const fetchVotes =async()=>{
  try{
    const response = await Axios.get('http://localhost:3500/getAns&Votes')
    console.log(response);

  }catch(err){
    console.log(err);
  }
 }
 useEffect(()=>{
//  fetchVotes()
  checkAuthAndFetchAns()
 fetchingAns()
  console.log(voteOnce)
 
 }, [])

 const handleAnswer = ()=>{
 setShowAnswerField(!showAnswerField)
 }
 const publishAnswer = ()=>{
  let Id = JSON.parse(localStorage.getItem("quesionId"))
  console.log(Id);
  Axios.post('http://localhost:3500/publishAnswer', {
    answer:answer,
    userId: userId,
    questionId: Id,
  }).then(response=>{
    console.log(response);
  }).catch(err=>{
    console.log(err);
  })
 
 }
 const takeAnswer = e => setAnswer(e.target.value)
 const showOptions = (id)=>{
  setVisOpt(!visOpt)
  setSpecificBtn(id)
 }
 const handleDelAns = (id)=>{
 
  Axios.delete(`http://localhost:3500/delAns`, {
    params:{
      id:id
    }
  }).then(response=>{
    console.log(response);
    setDeleteAnsSuccessMsg(true)
    setTimeout(()=>{
     setDeleteAnsSuccessMsg(false)
    }, 2000)
  })
  checkAuthAndFetchAns()
 }
 const handleEditAns = (id)=>{
  setEditId(id)
  setshowEditInp(!showEditInp)

 }
 const takeEdit = e=>setEdit(e.target.value)
 const saveEdit = (id)=>{
  Axios.put('http://localhost:3500/updateAns', {
    id:id,
    edit:edit
  }).then(response=>{
    console.log(response)
    setEditMsg(true)
    setTimeout(()=>{
      setEditMsg(false)
    }, 2000)
    
  })
  checkAuthAndFetchAns()
 }
 const like = async(Id)=>{
  setTimeout(()=>{ fetchingAns()},2000)
   const btn  = Id
   const UserId= userId
   if(btn===Id){
    
 const response = await Axios.get('http://localhost:3500/getVote',{
 params:{
  answerId:btn,
  userId:UserId
 }
  })
  if(response.data[0]){
    
    if(response.data[0].vote==='like'){
      
      Axios.put('http://localhost:3500/upvote', {
        id:Id,
        upvote:-1,
        downvote:0,
      })
          Axios.put('http://localhost:3500/votes', {
        answerId:Id,
        userId:userId,
        vote:'canvoteagain'
    })

     }else if(response.data[0].vote==="dislike"){
      Axios.put('http://localhost:3500/upvote', {
        id:Id,
        upvote:1,
        downvote:-1,
      })
          Axios.put('http://localhost:3500/votes', {
        answerId:Id,
        userId:userId,
        hasvoted:true,
        vote:'like'
    })
    fetchingAns()
     }else{
      Axios.put('http://localhost:3500/upvote', {
        id:Id,
        upvote:1,
        downvote:0,
       
      })
          Axios.put('http://localhost:3500/votes', {
        answerId:Id,
        userId:userId,
        hasvoted:true,
        vote:'like'
    })
  
     }
  }
  else{
      Axios.post('http://localhost:3500/votes', {
        answerId:Id,
        userId:userId,
        hasvoted:true,
        vote:'like'
    })
      Axios.put('http://localhost:3500/upvote', {
        id:Id,
        upvote:1,
        downvote:0,
      
      })
      fetchingAns()
    }
   }
   
 }
 const dislike = async(Id)=>{
  setTimeout(()=>{ fetchingAns()},1000)
  const btn  = Id
  const UserId= userId
  if(btn===Id){
 
const response = await Axios.get('http://localhost:3500/getVote',{
params:{
 answerId:btn,
 userId:UserId
}
 })
 if(response.data[0]){
   
   if(response.data[0].vote==='dislike'){
     Axios.put('http://localhost:3500/upvote', {
       id:Id,
       upvote:0,
       downvote:-1,
     })
         Axios.put('http://localhost:3500/votes', {
       answerId:Id,
       userId:userId,
       vote:'canvoteagain'
   })
   fetchingAns()
    }else if(response.data[0].vote==="like"){
     Axios.put('http://localhost:3500/upvote', {
       id:Id,
       upvote:-1,
       downvote:1,
     })
         Axios.put('http://localhost:3500/votes', {
       answerId:Id,
       userId:userId,
       hasvoted:true,
       vote:'dislike'
   })
   fetchingAns()
    }else{
     Axios.put('http://localhost:3500/upvote', {
       id:Id,
       upvote:0,
       downvote:1,
      
     })
         Axios.put('http://localhost:3500/votes', {
       answerId:Id,
       userId:userId,
       hasvoted:true,
       vote:'dislike'
   })
   fetchingAns()
    }
 }
 else{
     Axios.post('http://localhost:3500/votes', {
       answerId:Id,
       userId:userId,
       hasvoted:true,
       vote:'dislike'
   })
     Axios.put('http://localhost:3500/upvote', {
       id:Id,
       upvote:0,
       downvote:1,
     
     })
     fetchingAns()
   }
  }

}

  return (
 <div>
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
  <div id='main'>
     {isAuthenticated ? (
  <>
  {question &&
  <div id='answerComponent'>
{deleteAnsSuccessMsg &&
<div id='delAnsSucc'>
  <p>Answer deleted successuflly</p>
</div>
}
{editMsg&&
<div id='editMsg'>
  <p>Answer Edited successuflly</p>
</div>
}
    <h2 id='questionInAnsComp'>{question}</h2>
   {showFetchedAns ? (
      <div>
           { fetchedAns.map(data=>{
          return(
            <div key={data.idanswers} id='mappingAnswers'>
              
            
            <div id='displayAnsAlign'>
            <li>{data.answer}</li>
            {data.userId === userId && 
          <button onClick={()=>showOptions(data.idanswers)} id='btnToIcvon'><FontAwesomeIcon className='faBars' icon={faEllipsis}/></button>
          }
          {visOpt && specificBtn === data.idanswers &&
          <div id='optionsDiv'>
          <button onClick={()=>handleDelAns(data.idanswers)}><FontAwesomeIcon className='optionsIcon' icon={faTrashCan} /></button>
          <button onClick={()=>handleEditAns(data.idanswers)}><FontAwesomeIcon className='optionsIcon' icon={faPenToSquare} /></button>
          </div>
          }
            </div>
            {showEditInp && editId=== data.idanswers &&
            <div>
              <input onChange={takeEdit} type="text" />
              <button onClick={()=>saveEdit(data.idanswers)}>Edit</button>
              <button>hide edit</button>
            </div>
            }
            <div id='Vote'>
            <p >By: {data.username}</p>
          
            
             
              <div id='upDownVote'>
            <button onClick={()=>like(data.idanswers, data.userId)} id='thumbs'><FontAwesomeIcon className='thumbs' icon={faThumbsUp} />{data.upvote}</button>
            <button onClick={()=>dislike(data.idanswers)} id='thumbs'><FontAwesomeIcon className='thums' icon={faThumbsDown} />{data.downvote}</button>
            </div>
             
              
            
            </div>
          
            </div>
          )
        })}
      </div>
   ):(
    <div>
      <p id='NoAnsYet'>No answers yet. Click on the answer button to answer the question</p>
    </div>
   )}
    <button id='ClickToAddAns' onClick={handleAnswer}>Click to add answer</button>
    {showAnswerField && 
    <div>
      <textarea placeholder='add your answer'  onChange={takeAnswer} id='takeAns' name="" cols="30" rows="5"></textarea>
   
    <button id='publishAns' onClick={publishAnswer}>Publish Answer</button>

    </div>
    }
  </div>
  }
  </>
 ): (
  <>
   <div id='notLogged'>
        <h1>You are not Logged in</h1>
        <div id='notLoggedNavlinks'>
        <NavLink id='NavBtn' to='/login'>Login</NavLink>
        <NavLink id='NavBtn' to='/'>Join Now</NavLink>
        </div>
      </div>
  </>
 )}
  </div>
 )

 }

 </div>
  )
}

export default Answer;