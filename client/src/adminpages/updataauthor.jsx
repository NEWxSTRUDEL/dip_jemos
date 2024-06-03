import React, { useEffect } from 'react'
import { useState } from 'react';
import axios from 'axios';
import "./userupdata.css"
import { useLocation, useNavigate } from 'react-router-dom';

function Updataauthor() {
    const [author,setAuthor] = useState({
        name: "",
        surname:"",
        patronymic:"",
        descriptions: "",
        img: "",
      });
      const [oneauthor,setOneauthor] = useState([])

      const nav = useNavigate();
      const location = useLocation();
      const authorid = location.pathname.split("/")[2];

      console.log(authorid)

      useEffect(()=>{
        const fecthAllUser = async () =>{
            try{
                const res = await axios.get("http://localhost:8800/author/" + authorid)
                setOneauthor(res.data);
            }catch(err){
                console.log(err)
            }
        }
        fecthAllUser()
    },[])


      const handleChange = (e) =>{
        setAuthor((prev)=>({...prev,[e.target.name]: e.target.value}))
      };
    
    
      const handlClick = async e =>{
        e.preventDefault()
        try{
          await axios.put("http://localhost:8800/author/" + authorid, author)
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
                <h1>Обновить данные автора {ouse.name}</h1>
                <input type='text' placeholder={ouse.name} onChange={handleChange} name='name'/><br/>
                <input type='text' placeholder={ouse.surname} onChange={handleChange} name='surname' /><br/>
                <input type='text' placeholder={ouse.patronymic} onChange={handleChange} name='patronymic' /><br/>
                <input type='text' placeholder={ouse.descriptions} onChange={handleChange} name='descriptions' /><br/>
                <input type='file' onChange={handleChange} name='img' /><br/>
                <button className='butnext' onClick={handlClick}>Обновить</button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Updataauthor