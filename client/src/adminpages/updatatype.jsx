import React, { useEffect } from 'react'
import { useState } from 'react';
import axios from 'axios';
import "./userupdata.css"
import { useLocation, useNavigate } from 'react-router-dom';

function Updatatype() {
    const [type,setType] = useState({
        name: "",
      });
      const [oneauthor,setOneauthor] = useState([])

      const nav = useNavigate();
      const location = useLocation();
      const typeid = location.pathname.split("/")[2];


      useEffect(()=>{
        const fecthAllUser = async () =>{
            try{
                const res = await axios.get("http://localhost:8800/type/" + typeid)
                setOneauthor(res.data);
            }catch(err){
                console.log(err)
            }
        }
        fecthAllUser()
    },[])


      const handleChange = (e) =>{
        setType((prev)=>({...prev,[e.target.name]: e.target.value}))
      };
    
    
      const handlClick = async e =>{
        e.preventDefault()
        try{
          await axios.put("http://localhost:8800/type/" + typeid, type)
          nav("/admin");
        }catch(err){
          console.log(err)
        }
      }



  return (
    <div className='mainvin'>
      <div>
        {oneauthor.map((ouse)=>(
          <div key={ouse.ID}>
                <h1>Обновить данные типа {ouse.name}</h1>
                <input type='text' placeholder={ouse.name} onChange={handleChange} name='name'/><br/>
                <button className='butnext' onClick={handlClick}>Обновить</button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Updatatype