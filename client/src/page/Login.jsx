import React, { useState } from 'react'
import "./xreg-log.css"
import { useNavigate } from 'react-router-dom'
import axios from 'axios';

function Login() {

  const [values,setValues] = useState();

  const nav = useNavigate();

const handleChange = (event) => {
  setValues(prev => ({...prev, [event.target.name]:[event.target.value]} ))
}

axios.defaults.withCredentials = true;
  const handlClick = async e =>{
    e.preventDefault()
    try{
      
      window.localStorage.setItem("isLogedIn" ,true)
      const res = await axios.post("http://localhost:8800/login", values)
      if(res.data.Login){
        nav("/");
        window.location.reload()
        console.log("yse")
      }else{
        alert("Нверный пароль или email");
        console.log("No")
      }
    }catch(err){
      
    }
  }

    return (
      <div className="register-form-container">
      <h2>Войти</h2>
      <form className="register-form">
        <div className="form-group">
          <label htmlFor="username">Email</label>
          <input
            type="email"
            name="email"
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Пароль</label>
          <input
            type="password"
            name="password"
            onChange={handleChange}
            required
          />
        </div>
        <button href='/' onClick={handlClick} className="submit-button">Войти</button>
      </form>
      <p className="login-link">
        У вас нет учетной запись? <a href="/register">Зарегаться</a>
      </p>
    </div>
    )
}

export default Login



/*  <div className='mainwin'>
      <h1>Войти</h1>
      <input onChange={handleChange} name='email' placeholder='Почта'/><br/>
      <input onChange={handleChange} name='password' placeholder='Пароль'/><br/>
      <button type='' onClick={handlClick} className='butnext'>ВХОД</button>
      <div>Не зарегестрирован? зерегестрируйся!</div>
      <a href='/register'>Регистрация</a>
      </div>*/