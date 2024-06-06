import axios from 'axios';
import React, { useEffect, useState } from 'react'
import "./Admin.css"
import { useNavigate } from 'react-router-dom';
import Notification from "./Notification"

function Addtype() {
  const [type,setType] = useState({
    name:"",
  });

  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');

  const handleChange = (e) =>{
    
    setType((prev)=>({...prev,[e.target.name]: e.target.value}))
  };

    const nav = useNavigate();


  const handlClick = async e =>{
  e.preventDefault()
    
  try{
      await axios.post("http://localhost:8800/type", type)
      setShowNotification(true);
      setNotificationMessage('Вы добавили курс');
      nav("/admin");
    }catch(err){
      setShowNotification(true);
      setNotificationMessage('Вы не заполнили данные');
    }
  }
  useEffect(() => {
    if (showNotification) {
      const timer = setTimeout(() => {
        setShowNotification(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [showNotification]);


    return (
      <div className='mainvin2'>
        <div className='form-group'>
          <h1>Добавить тип курса</h1>
          <input type='text' placeholder='Тип' onChange={handleChange} name='name'/><br/>
          <button  className='butnext' onClick={handlClick}>Добавить</button>
          <Notification show={showNotification} message={notificationMessage}/>
        </div>
      </div>
    )
}

export default Addtype