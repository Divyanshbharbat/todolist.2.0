import React from 'react'
import './landin.css'
import { NavLink } from 'react-router-dom'
const Landingpage = () => {
  return (
    <div>
      <div  data-aos="fade-up"
     data-aos-easing="linear"
     data-aos-duration="1500" className="main">
        <div className="navbar ">
           <ul data-aos="fade-left"
     data-aos-anchor="#example-anchor"
     data-aos-offset="500"
     data-aos-duration="500" className='my-3'>
             <NavLink to="/signup">            <li><button>Signup</button></li></NavLink>
             <NavLink  to="/login" >            <li><button>Login</button></li></NavLink>
           </ul>
        </div>
        <div className="logo mx-3  ">
          <h1 data-aos="zoom-out-up"  className='fw-bold'>  TodoList</h1>
        </div>
        
        <div className="content my-3">
<div className="c mx-4 my-5 ">
    <h5 data-aos="fade-right"
     data-aos-offset="300"
     data-aos-easing="ease-in-sine" className='fw-bold my-3'>Stay organized and boost your productivity with our simple yet powerful To-Do List app.</h5>
 <div className="btn3 my-3 ">
<NavLink  to="/login" >    <button data-aos="zoom-out-down"
 
    className='btn5 p-3 px-4  fs-3 fw-bold border-0'  >Explore</button></NavLink>
 </div>
</div>
        </div>
      </div>
    </div>
  )
}

export default Landingpage
