import React, { useEffect, useRef, useState } from 'react';
import "./profile.css"
import axios from 'axios';
import { useNavigate,Link } from 'react-router-dom';
import emailjs from '@emailjs/browser';

function Sendcours() {

  const [user,setUser] = useState([])
  const [userid,setUserid] = useState([])
  const [user1,setUser1] = useState([])
  const [name,setName] = useState([])
  const [valid,setValid] = useState([])
  const [date,setDate] = useState([])
  const [buy,setBuy] = useState([])
  const [course,setСourse] = useState([])

  const nav = useNavigate();

  axios.defaults.withCredentials = true;
  useEffect(()=>{
    const fecthAllUser = async () =>{
        try{
          const res = await axios.get("http://localhost:8800")
          const res3 = await axios.get("http://localhost:8800/buy_course")
          const res2 = await axios.get("http://localhost:8800/course")
          const res4 = await axios.get("http://localhost:8800/User")
          setUser1(res4.data);
          setСourse(res2.data);
          setBuy(res3.data)

          setUserid(res.data.ID)
          setUser(res.data.email)
          setName(res.data.name)
          setDate(res.data.date_start_akk)
          setValid(res.data.valid)
        }catch(err){
            console.log(err)
        }
    }
    fecthAllUser()
},[])

const getUserName = (id) => {
  const use1 = user1.find((use) => use.ID === id);
  return use1 ? use1.name : 'Unknown User';
};

const getCourseTitle = (id,cid,date) => {
    const cour = course.find((courses) => courses.ID === id);

    if(cid == userid){
    return (
      <div  className="alluse">
        Вы купили: {cour.name} Дата: {date}
        <button><Link className='butupdata' to={`/course/${id}`}>Узанть больше о курсе</Link></button>  
      </div>
    );
  }else{
    return undefined;
  }
};

const form = useRef();

const buycors = async e =>{
    e.preventDefault()

    emailjs
    .sendForm('service_frjp6qq', 'template_j5vvtwk', form.current, {
      publicKey: 'PfbGmtvViWaARzzK3',
    })
    .then(
      () => {
        console.log(form.current);
        console.log('SUCCESS!');
      },
      (error) => {
        console.log(form);
        console.log(form.current);
        console.log('FAILED...', error.text);
      },
    );

    nav("/");
}


    if(valid){
      return (
        <div className="checkout-form-container">
        <form ref={form} className="checkout-form">
            <div className="form-group">
              <label htmlFor="expiryDate">Как мы с вами можем свезаться "ссылка на тг, viber и т.д."</label>
              <input
              name='user_email'
                type="text"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="cvv">Как вас зовут. ФИО</label>
              <input
              name='subject'
                type="text"
                required
              />
            </div>
            <div className="form-group textboxx">
              <label htmlFor="cardName">Опишите свою деетельность, и какой курс вы хотите добавить, мы с вами свяжемся.</label>
              <textarea name="message" />
             
        
            </div>
            <input onClick={buycors} type="submit" className="submit-button" value="ОТПРАВИТЬ" />
           
          </form>
      </div>
    )
    }else{
      return (
       <div>
            Вы не вошли в аккаунт
        </div>
      );
    }

  
}

export default Sendcours;
