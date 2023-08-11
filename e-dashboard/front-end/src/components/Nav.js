import React from 'react'
import {Link,useNavigate} from 'react-router-dom';
export default function Nav() {
  const navigate = useNavigate();
  const auth = localStorage.getItem('user')

  // We are removing the data from local storage by using logout function onClick
  const logout = ()=>{
    localStorage.clear();
    navigate('/signup')
  }
  return (
    <div>
        <ul className='nav-ul'>
            <li><Link to="/">Products</Link></li>
            <li><Link to="/add">Add Products</Link></li>
            <li><Link to="/update">Update Products</Link></li>
            <li><Link to="/profile">Profile</Link></li>

            <li>{ auth?<Link onClick={logout} to="/signup">Logout</Link>:
            <Link to="/signup">Sign up</Link>}</li>
            
        </ul>
    </div>
  )
}
