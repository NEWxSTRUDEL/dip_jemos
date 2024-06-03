import axios from 'axios';
import React, { useState } from 'react'
import "./Admin.css"
import { useNavigate } from 'react-router-dom';

function Addtype() {
  const [type,setType] = useState({
    name:"",
  });

  const handleChange = (e) =>{
    
    setType((prev)=>({...prev,[e.target.name]: e.target.value}))
  };

    const nav = useNavigate();

  const handlClick = async e =>{
    e.preventDefault()
    try{
      await axios.post("http://localhost:8800/type", type)
      nav("/admin");
    }catch(err){

    }
  }

    return (
      <div className='mainvin2'>
        <div className='form-group'>
          <h1>Добавить тип курса</h1>
          <input type='text' placeholder='Тип' onChange={handleChange} name='name'/><br/>
          <button  className='butnext' onClick={handlClick}>Добавить</button>
        </div>
      </div>
    )
}

export default Addtype