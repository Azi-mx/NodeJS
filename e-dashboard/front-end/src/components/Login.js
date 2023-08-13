import {React,useEffect,useState} from 'react'
import {useNavigate} from 'react-router-dom'
// Comments are already done on Signup.js
export default function Login() {
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    let navigate = useNavigate();
    useEffect(()=>{
        const auth = localStorage.getItem('user')
        if(auth){
          navigate('/')
        }
      },[])
    const handlelogin = async ()=>{
        console.log(email,password);
        let result = await fetch('http://localhost:8000/login',{
            method:'post',
            body:JSON.stringify({email,password}),
            headers:{
                'Content-type':'application/json'
              }
        })
        result = await result.json();
        console.log(result);
        if(result.name){
            localStorage.setItem("user",JSON.stringify(result));
            navigate('/')
        }
        else{
            alert('Please Enter Correct Details');
        }

    }
    
  return (
    <div className='login'>
        <h1>Log In Page</h1>
        <input className='inputBox' onChange={(e)=>setEmail(e.target.value)} value={email}placeholder='Enter Email'
         type='text'/>
        <input className='inputBox' onChange={(e)=>setPassword(e.target.value)} value={password} 
        placeholder='Enter Password' type='text'/>
        <button className='app-button' onClick={handlelogin}>Log In</button>
    </div>
  )
}
