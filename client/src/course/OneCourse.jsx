import React, { useEffect, useState } from 'react'
import "./OneCoursecss.css"
import axios from 'axios';
import { useLocation, Link } from 'react-router-dom';
import { useParams, useNavigate } from 'react-router-dom';

function OneCourse() {
  const [course, setCourse] = useState([])
  const [author, setAuthor] = useState([])


  const location = useLocation();
  const courseid = location.pathname.split("/")[2];

  axios.defaults.withCredentials = true;
  useEffect(()=>{
    const fecthAllUser = async () =>{
        try{
            const res = await axios.get("http://localhost:8800/course/" + courseid)
            setCourse(res.data);
            const res1 = await axios.get("http://localhost:8800/author")
            setAuthor(res1.data)
        }catch(err){
            console.log(err)
        }
    }
    fecthAllUser()
},[])

const getAuthor = (id) => {
  const aut1 = author.find((aut) => aut.ID === id);
  return aut1 ? aut1.name : 'Unknown User';
};

  const history = useNavigate();

  const handleBuyCourse = () => {
    history(`/buycours?courseId=${courseid}`);  // Перенаправляем на страницу покупки с query параметром
  }

  const handlelinkCourse = () => {
    history(`/linkcours?courseId=${courseid}`);  // Перенаправляем на страницу покупки с query параметром
  }


    return (   
        <div className='mainv'>
          {course.map((cour) => (
            <div key={cour.ID}>
              <div className='diw1'>
                  <img className='imgcours' src={`http://localhost:8800/course/image/${cour.ID}`} alt={course.name} /> 
                  <div className='auhtor' >Автор курса: <button  className='authorbut' ><Link to={`/authorpage/${cour.ID_author}`}>{getAuthor(cour.ID_author)}</Link></button>   </div>
              </div>
              <div className='diw2'>
                <div className='namecours'>{cour.name}</div>
                <div className='opi'>Описание курса:</div>
                <div className='disc'>{cour.descriptions}</div>
                <div style={{fontSize: "24px"}}>{cour.price} рублей</div>
               <div className='box'><button className='buybut' onClick={handleBuyCourse}>Купить</button></div>
               <div><button className='sendbuy' onClick={handlelinkCourse}>Записаться на онлай обучения</button></div>
              </div>   
        </div>
        ))}
      </div>
    )
}

export default OneCourse