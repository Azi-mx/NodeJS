import React from 'react'
import {Link} from 'react-router-dom';
export default function Nav() {
  return (
    <div>
        <ul className='nav-ul'>
            <li><Link to="/">Products</Link></li>
            <li><Link to="/add">Add Products</Link></li>
            <li><Link to="/update">Update Products</Link></li>
            <li><Link to="/logout">logout</Link></li>
            <li><Link to="/profile">Profile</Link></li>
            
        </ul>
    </div>
  )
}
