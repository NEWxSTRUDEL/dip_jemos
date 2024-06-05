import React, { useEffect, useState } from 'react';
import "./profile.css"
import axios from 'axios';
import { useNavigate,Link } from 'react-router-dom';

function Profile() {

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
      <div  className="alluse profile-course">
        Вы купили: {cour.name} Дата: {date.slice(0, 10)} | Вермя: {date.slice(11, 19)}
        <button className=''><Link className='linkk' to={`/course/${id}`}>Узанть больше о курсе</Link></button>  
      </div>
    );
  }else{
    return undefined;
  }
};



    const Logout = () => { 
      axios.get("http://localhost:8800/logout")
      nav("/")
      window.location.reload()
      
    }
    const Sendcours = () => {
      nav("/sendcours");
    }

    if(valid){
      return (
        <div>
        <div className="profile-container">
        <h2 className="profile-header">Профиль пользователя</h2>
        <div className="profile-info">
          <label className="profile-label">Имя:</label>
          <span className="profile-data">{name}</span>
        </div>
        <div className="profile-info">
          <label className="profile-label">Почта:</label>
          <span className="profile-data">{user}</span>
        </div>
        <div className="profile-info">
          <label className="profile-label">Дата создания аккаунта:</label>
          <span className="profile-data">{date.slice(0, 10)}</span>
        </div>
        <button className="logout-button" onClick={() => Logout()}>Выйти из аккаунта</button>
        <button className="sendadminemail" onClick={() => Sendcours()}>Заявка на курс</button>

      </div>
      <div>

      <div className="text">{buy.map((b)=>(    
                    <div key={b.ID}>
                        <a>{getCourseTitle(b.id_course, b.id_user, b.date)}</a>
                    </div>
                ))}
                </div>
      </div>
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

export default Profile;


/*<div>
            <div className='textname' >{name}</div>
            <div className='' >{user}</div>
            <div className='' >{date}</div>
            <button onClick={() => Logout()} >ВЫХОД</button>
        </div>*/