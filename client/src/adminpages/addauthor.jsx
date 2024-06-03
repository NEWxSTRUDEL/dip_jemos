import axios from 'axios';
import React, { useState } from 'react'
import "./Admin.css"
import { useNavigate } from 'react-router-dom';

function Addauthor() {
  const [author,setAuthor] = useState({
    name:"",
    surname:"",
    patronymic:"",
    descriptions: "",
    img: "",
  });

  const nav = useNavigate();

  const handleChange = (e) =>{
    setAuthor((prev)=>({...prev,[e.target.name]: e.target.value}))
  };


  const handlClick = async e =>{
    e.preventDefault()
    try{
      await axios.post("http://localhost:8800/author", author)
      nav("/admin");
    }catch(err){

    }
  }

    return (
      <div className='mainvin2'>
      <h1>Добавить автора</h1>
      <div className='form-group'>
        <input type='text' placeholder='Имя' onChange={handleChange} name='name'/><br/>
        <input type='text' placeholder='Фамилия' onChange={handleChange} name='surname' /><br/>
        <input type='text' placeholder='Отчество' onChange={handleChange} name='patronymic' /><br/>
        <textarea  type='text' placeholder='Описания' onChange={handleChange} name='descriptions' /><br/>
        <button  className='butnext' onClick={handlClick}>Добавить</button>
      </div>
      </div>
    )
}

export default Addauthor