import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import './signup.css'
import { useNavigate } from 'react-router-dom';
import { toast, Toaster } from 'react-hot-toast'
import { NavLink } from 'react-router-dom';

const signup =  () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  let navigate = useNavigate()
  const onSubmit = async (data) => {


    await axios.post(`${import.meta.env.VITE_FRONT_URL}/signup`, data,{withCredentials:true,}).then((res) => {
       
        if (res.data == 'success') {
          toast.success("Signup Successfully")
          setTimeout(() => {
            navigate("/login");

          }, 1000)
        }
      })
      .catch(error => {
        toast.error("Something went Wrong")
      });
  };

  return (
    <div  className="container-fluid  " style={{ height: "100vh", width: "100%" }}>
      <Toaster className="bg-dark text-white" />
      <div className="row d-flex">
        <div  className="col-lg-6 col-sm-12">
          <div  className="container-fluid d-flex justify-content-center my-4 py-5  ">
            <div className="head border  " id='login' style={{ height: '70vh', width: "90vh", borderRadius: "3vh" }}>
              <h1 className="text-center  my-5" style={{color:"black",fontSize:"6vh"}}>Signup</h1>
              <div  className="container-fluid  text-center my-5">
                <form className='b' onSubmit={handleSubmit(onSubmit)}>
                  <div className="input my-5 mx-3">
                    <input
                      type="text"
                      {...register("username", { required: "Email is required" })}
                      placeholder="Username"
                      style={{
                        backgroundColor: "#eaeaea",
                        border: "none",
                        height: "6vh",
                        borderRadius: '1vh',
                        padding: "1vh"
                      }}
                    />
                    {errors.username && <p className='my-2 text-white'>{errors.username.message}</p>}
                  </div>
                  <div className="input my-5 mx-3">
                    <input
                      type="password"
                      {...register("email", { required: "Email is required" })}
                      placeholder="Email" name='email' id='email'
                      style={{
                        backgroundColor: "#eaeaea",
                        border: "none",
                        height: "6vh",
                        borderRadius: '1vh',
                        padding: "1vh"
                      }}
                    />
                    {errors.password && <p className='my-2 text-white'>{errors.password.message}</p>}
                  </div>
                  <div className="input my-5 mx-3">
                    <input
                      type="password"
                      {...register("password", { required: "Password is required" })}
                      placeholder="Password" name='password' id='password2'
                      style={{
                        backgroundColor: "#eaeaea",
                        border: "none",
                        height: "6vh",
                        borderRadius: '1vh',
                        padding: "1vh"
                      }}
                    />
                    {errors.password && <p className='my-2 text-white'>{errors.password.message}</p>}
                  </div>
                 
                  <div className="button d-flex justify-content-center  ">
                    <NavLink to={'/login'}> <button type="button" id='btn' className="btn bg-white mx-3">Login</button></NavLink>
                    <button type="submit" id='btn2' className="btn bg-white  mx-3">Submit</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-6 col-sm-12 ">
         <img className='img-fluid' src="https://img.freepik.com/premium-vector/desktop-mobile-illustration-login-page-data-analysis_559664-335.jpg?w=740" alt="" />
        </div>
      </div>
    </div>
  );
};

export default signup;