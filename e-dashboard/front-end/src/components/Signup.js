import React,{useState,useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
export default function Signup() {
    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')

    const navigate = useNavigate()
    
    useEffect(()=>{
      const auth = localStorage.getItem('user')
      if(auth){
        navigate('/')
      }
    })

    const collectData = async ()=>{
        console.warn(name,email,password)
        //Here api is integrated using fetch method and the data will only fetch when localhost is running on local
        let result = await fetch('http://localhost:8000/register',
        {
          method:'post',
          //We are using json.stringify just because we are send data so data should be in Json format
          body:JSON.stringify({name,email,password}),
          headers:{
            'Content-type':'application/json'
          }
        })
        result = await result.json()
        console.log(result)
        localStorage.setItem("user",JSON.stringify(result))
        if(result){
          navigate('/')
        }
    }
  return (
    <div className='register'>
        <h1>Register</h1>
        <input className='inputBox' type='text' value={name} onChange={(e)=>setName(e.target.value)} placeholder='Enter Your name'></input>
        <input className='inputBox' type='text' value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='Enter Your Email Id'></input>
        <input className='inputBox' type='password' value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='Enter Your Password'></input>
        <button className='app-button' onClick={collectData}>Sign Up</button>
    </div>
  )
}
