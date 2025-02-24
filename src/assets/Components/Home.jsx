import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './home.css'
import { Toaster, toast } from 'react-hot-toast';
import { Navigate, useNavigate } from 'react-router-dom';
const Home = () => {
  const [time, setTime] = useState('');
  const [work, setWork] = useState('');
  const [array, setArray] = useState([]);

  const [check, setcheck] = useState(false)
  let navigate = useNavigate()

  // Handle delete request
  const handleDelete = async (_id) => {
    const token = localStorage.getItem("token");

    try {
      // Send a DELETE request for the specific item
      const response = await axios.delete(`${import.meta.env.VITE_FRONT_URL}/deletedata/${_id}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Send token in Authorization header
        },
        withCredentials: true, // Include cookies if needed
      });
      toast.success("Successfully Deleted")
      // After deletion, re-fetch the data
      getData();
    } catch (err) {
      console.log("Error deleting data:", err);
    }
  };

  // Fetch data from the server
  const getData = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(`${import.meta.env.VITE_FRONT_URL}/getdata`, {
        headers: {
          Authorization: `Bearer ${token}`, // Send token in Authorization header
        },
        withCredentials: true, // Include cookies if needed
      });
 setname(response.data.user)
      setArray(response.data.data); // Update state with the fetched data
    } catch (err) {
      console.log("Error fetching data:", err);
    }
  };
  const [name, setname] = useState('')
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");

      await axios.post(`${import.meta.env.VITE_FRONT_URL}/senddata`, { time, work }, {
        headers: {
          Authorization: `Bearer ${token}`, // Send token in Authorization header
        },
        withCredentials: true, // Include cookies if needed
      });
      toast.success("Successfully Submitted")
      setTime("")
      setWork("")
      // Re-fetch data after submitting
      getData();
    } catch (err) {
      console.log("Error submitting data:", err);
    }
  };

  // Fetch data when component mounts
  useEffect(() => {
    getData();
  }, []);

  return (
    <>
     <div id="back" className='p-5'>
     <div className="container-fluid  text-center" >

<Toaster />

<h2><span style={{ textDecoration: "underline", borderRadius: "50px 50px 5px" }} className='head underline  p-3 fw-bold  '> {name.toUpperCase()}
</span> </h2>
</div>
<span className=' d-flex  justify-content-end fs-3 p-2' ><button  onClick={() => {
  localStorage.setItem("token", "");
  toast.success("Successfully Logout")
  navigate("/")
}
} className='p-2 logout text-dark fw-bold my-5' style={{ backgroundColor: "purple", color: "", border: 0, borderRadius: "1vh" }} >Logout</button>  </span>
<div   className="container-fluid "  id='back'>
{array.map((item) => (
  <div data-aos="flip-up"  key={item._id} id='box' className="container-fluid  py-5 px-3  text-white my-5" >
    <div    className="row d-flex">
        <div className="create my-3 "><span className='fs-4'>Create At : </span><span id='create' className=''>{item.createat}</span></div>
      <div className="col-lg-3 col-sm-12 my-2"><span className='fs-3 text-dark fw-bolder'>{item.time}</span></div>
      <div className="col-lg-3 col-sm-12 my-3 "><textarea  style={{ height: "20vh", width: "30vh", border: 0 }} value={item.work} id="text"></textarea></div>
      <div className="col-lg-3 col-sm-12 my-2  ">      <button  className=' btn border-0   px-5 fw-bolder text-white' style={{ borderRadius: "1vh" }} onClick={() => handleDelete(item._id)}>Delete</button></div>
      {/* Add the delete button */}

    </div>
  </div>
))}
</div>

<h1 className='fs-1 text-dark fw-bold mx-5'>Create list</h1>
<form onSubmit={handleSubmit}>
<div className="container-fluid  my-5 p-5 " id='form' style={{ display: "flex", flexDirection: "column" }}>
  <span className='fs-2 fw-bold my-3'>Choose Time</span>
  <div className="input my-2">
    <input className='py-1 border-0 px-3'
      type="time" required={true}
      placeholder="Time"
      onChange={(e) => setTime(e.target.value)}
      value={time}
    />
  </div>
  <span className='fs-2 fw-bold my-2'>Choose Time</span>
  <div className="input my-2">
    <input className='in border-0  py-1 px-3'
      type="text"
      placeholder="Work"   required={true}
      onChange={(e) => setWork(e.target.value)}
      value={work}
    />
  </div>
  <div className="input my-2">
    <button className=' fw-bold border-0 p-3 text-black btn2'  style={{ borderRadius: "1vh" }} type="submit">Submit</button>
  </div>
</div>

</form>
     </div>
    </>
  );
};

export default Home;