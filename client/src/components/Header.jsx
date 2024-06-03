import React, { useEffect, useState } from 'react';
import "./Headercss.css"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Header() {

  const [user,setUser] = useState([])
  const [valid,setValid] = useState([])
  
  const nav = useNavigate();

  axios.defaults.withCredentials = true;
  useEffect(()=>{
    const fecthAllUser = async () =>{
        try{
          const res = await axios.get("http://localhost:8800")
          setUser(res.data.name)
          setValid(res.data.valid)
        }catch(err){
            console.log(err)
        }
    }
    fecthAllUser()
},[])

    const Logout = () => { 
      axios.get("http://localhost:8800/logout")
      nav("/")
      window.location.reload()
    }

    const reg = () => {
      nav("/register")
    }
    const log = () => {
      nav("/login")
    }
    const jemos = () => {
      nav("/")
    }
    const Anas = () => {
      nav("/info")
    }
    const Profile = () => {
      nav("/profile")
    }
  

    if(valid){
      return (
        <header className="header" >
  
              <a href='/' className='header-logo scale' onClick={jemos}>Jemos</a>
  
              <div className="header-nav">
                <button className='but1' onClick={Anas}>О нас</button>
                <button className='but2' onClick={Profile}>{user}</button>
                <button className='but3' onClick={() => Logout()} >ВЫХОД</button>
              </div>
  
          </header>)
    }else{
      return (
        <header className="header" >

            <a href='/' className='header-logo scale' onClick={jemos}>Jemos</a>

            <div className="header-nav">
              <button className='but1' onClick={Anas}>О нас</button>
              <button className='but1' onClick={log}>Вход</button>
              <button className='but1' onClick={reg}>Регистрация</button>
            </div>

        </header>
      );
    }

  
}

export default Header;
