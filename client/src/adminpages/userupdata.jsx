import React, { useEffect } from 'react'
import { useState } from 'react';
import axios from 'axios';
import "./userupdata.css"
import { useLocation, useNavigate } from 'react-router-dom';

function Userupdata() {
 const [user,setUser] = useState({
        email: "",
        password:"",
        role:"use"
      });
      const [oneuser,setOneuser] = useState([])

      const nav = useNavigate();
      const location = useLocation()
      const userid = location.pathname.split("/")[2];

      useEffect(()=>{
        const fecthAllUser = async () =>{
            try{
                const res = await axios.get("http://localhost:8800/User/" + userid)
                setOneuser(res.data);
            }catch(err){
                console.log(err)
            }
        }
        fecthAllUser()
    },[])


      const handleChange = (e) =>{
        setUser((prev)=>({...prev,[e.target.name]: e.target.value}))
      };
    
    
      const handlClick = async e =>{
        e.preventDefault()
        try{
          await axios.put("http://localhost:8800/User/" + userid, user)
          nav("/admin");
        }catch(err){
          console.log(err)
        }
      }



  return (
    <div className='mainvin'>
      <div>
        {oneuser.map((ouse)=>(
          <div key={ouse.ID}>
                <h1>Обновить данные пользователя {ouse.email}</h1>
                <input type='text' placeholder={ouse.email} onChange={handleChange} name='email'/><br/>
                <input type='text' placeholder={ouse.password} onChange={handleChange} name='password' /><br/>
                <input type='text' placeholder={ouse.role} onChange={handleChange} name='role' /><br/>
                <button  className='butnext' href='/' onClick={handlClick}>Обновить</button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Userupdata