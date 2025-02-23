import React from 'react'
import Home from './assets/Components/Home'
import Signup from './assets/Components/signup'
import Login from './assets/Components/Login'
import Landingpage from './assets/Components/Landingpage'
import {createBrowserRouter,RouterProvider} from 'react-router-dom'
const App = () => {

const router=createBrowserRouter([
  {
    path:"/login",
    element: <div>
  <Login/>
    </div>
  },
  
  {
    path:"/",
    element:<>
    <Landingpage/>
    </>
  },{
    path:"/signup",
    element: <div>
   <Signup/>
    </div>
  }
  , {
    path:"/home",
    element: <div>
  <Home/>
    </div>
  }
])


  return (
   <>
   <RouterProvider router={router}/>
   </>
  )
}

export default App