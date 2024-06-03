import React, { useEffect, useRef, useState } from 'react';
import "./buycours.css"
import axios from 'axios';
import {useLocation, useNavigate } from 'react-router-dom';
import emailjs from '@emailjs/browser';

function Buycours() {


  const [valid,setValid] = useState([])
  const [username,setUsername] = useState([])
  const [useremail,setUseremail] = useState([])
    const [userid,setUserid] = useState([]) 
    const [course,setCourse] = useState([]) 
    
    const nav = useNavigate();

  const [buycourse,setBuycourse] = useState({
    id_course: "",
    id_user: "",
    date: "",//new Date().toISOString().slice(0, 19).replace('T', ' ')
  });



  axios.defaults.withCredentials = true;
  useEffect(()=>{
    const fecthAllUser = async () =>{
        try{
          const res = await axios.get("http://localhost:8800")
          const res1 = await axios.get("http://localhost:8800/course/" + courseId)
          setUseremail(res.data.email)
          setUsername(res.data.name)
          setCourse(res1.data);
          setValid(res.data.valid);
          setUserid(res.data.ID);

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
                      String(currentDate.getHours()).padStart(2, '0') + ':' + 
                      String(currentDate.getMinutes()).padStart(2, '0') + ':' + 
                      String(currentDate.getSeconds()).padStart(2, '0');
setBuycourse(prevState => ({
  ...prevState,
  date: formattedDate
}));



},[])

const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const courseId = queryParams.get('courseId');


useEffect(() => {
    
    if (userid && courseId) {
      setBuycourse(prevState => ({
        ...prevState,
        id_course: courseId,
        id_user: userid
      }));
    }
  }, [userid, courseId]);

    const form = useRef();
  
    const getNameCoures = (id) => {
        const courseItem = course.find((item) => item);
        return courseItem ? courseItem.name : 'Unknown Course';
    };

    const getDownCoures = (id) => {
        const courseItem = course.find((item) => item);
        return courseItem ? courseItem.Download : 'Unknown Course';
    };

    const getLinkCoures = (id) => {
        const courseItem = course.find((item) => item);
        return courseItem ? courseItem.link : 'Unknown Course';
    };


    var send = {
        subject: username,
        user_name: username,
        to: useremail,
        link: getLinkCoures(courseId),
        Download: getDownCoures(courseId),
        message: "спасибо за покупку",
        cours: getNameCoures(courseId)
    };
   

const buycors = async e =>{
    e.preventDefault()

   console.log(courseId)

    emailjs
    .send('service_frjp6qq', 'template_0vm0blb', send, 'PfbGmtvViWaARzzK3')
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

    try{
        const response = await axios.post("http://localhost:8800/buycourse", buycourse)
        console.log('Response:', response.data);    
        nav("/nicebuy")
      }catch(err){
        
      }
}

if(valid){
    return (
        <div className="checkout-form-container">
        <div>{course.map((cour) => (
          <div key={cour.ID}> Покупка курса: {cour.name}<br/></div>
          ))}</div>
          <h2>Введите данные карты</h2>
          <form ref={form} className="checkout-form">
            <div className="form-group">
              <label htmlFor="cardNumber">Номер карты</label>
              <input
              name='user_name'
                type="text"
                id="cardNumber"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="expiryDate">Дата окончания карты (MM/YY)</label>
              <input
              name='to'
                type="text"
                id="to"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="cvv">CVV subj</label>
              <input
              name='subject'
                type="text"
                id="cvv"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="cardName">Имя на карте</label>
              <input
              name='message'
                type="text"
                id="cardName"
                required
              />
            </div>
            <input onClick={buycors} type="submit" className="submit-button" value="КУПИТЬ" />
           
          </form>
        </div>
      );
  }else{
    return (
     <div>
          Войди в акаунт
      </div>
    );
  }
}
export default Buycours;
