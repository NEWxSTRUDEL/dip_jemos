import axios from 'axios';
import React, { useEffect, useState } from 'react'
import "./xreg-log.css"
import { useNavigate } from 'react-router-dom';

function Registration() {
  const [user,setUser] = useState({
    name: "",
    email:"",
    password:"",
    role:"use",
    date_start_akk: "",
  });

  const nav = useNavigate();
  
  const handleChange = (e) =>{
    setUser((prev)=>({...prev,[e.target.name]: e.target.value}))
  };


  const handlClick = async e =>{
    e.preventDefault()
    
    try{
      await axios.post("http://localhost:8800/user", user)
      nav("/login");
    }catch(err){

    }
  }
  
  const handlcl2 = async e =>{
    e.preventDefault()
    console.log(user.role)
  }

  axios.defaults.withCredentials = true;
  useEffect(()=>{
    const fecthAllUser = async () =>{
        try{
          const res = await axios.get("http://localhost:8800")
          console.log(res);
        }catch(err){
            console.log(err)
        }
    }
    fecthAllUser()

// Устанавливаем текущую дату и время при загрузке компонента
const currentDate = new Date();
const formattedDate = currentDate.getFullYear() + '-' + 
                      String(currentDate.getMonth() + 1).padStart(2, '0') + '-' + 
                      String(currentDate.getDate()).padStart(2, '0') + ' ' + 
                      String(currentDate.getHours()  + 3).padStart(2, '0') + ':' + 
                      String(currentDate.getMinutes()).padStart(2, '0') + ':' + 
                      String(currentDate.getSeconds()).padStart(2, '0');
    setUser(prevState => ({
  ...prevState,
  date_start_akk: formattedDate
}));
},[])

  console.log(user)
  return (
    <div className="register-form-container">
      <h2>Регестрироваться</h2>
      <form className="register-form">
        <div className="form-group">
          <label htmlFor="username">Имя</label>
          <input
            type="text"
            name="name"
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Пароль</label>
          <input
            type="password"
            name="password"
            onChange={handleChange}
            required
          />
        </div>
        <button onClick={handlClick} className="submit-button">Зарегистрироваться</button>
        <button onClick={handlcl2} className="submit-button">проверить</button>
      </form>
      <p className="login-link">
        У вас уже есть учетная запись? <a href="/login">войти</a>
      </p>
    </div>
  );
}
/*<div className='mainwin'>
      <h1>Регистрация</h1>
      <input type='text' placeholder='Почта' onChange={handleChange} name='email'/><br/>
      <input type='text' placeholder='Пароль' onChange={handleChange} name='password' /><br/>
      
      <div>Зарегестрирован? Войди в акаунт!</div>
      <a href='/login'>Автаризация</a>
      </div>*/
//<button  className='butnext' href='/' onClick={handlClick}>Зарегать</button>
export default Registration