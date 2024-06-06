// OneCourse.js
import React, { useEffect, useState } from 'react';
import './OneCoursecss.css';
import axios from 'axios';
import { useLocation, Link, useNavigate } from 'react-router-dom';

function OneCourse() {
  const [course, setCourse] = useState([]);
  const [author, setAuthor] = useState([]);

  const location = useLocation();
  const courseid = location.pathname.split("/")[2];

  axios.defaults.withCredentials = true;

  useEffect(() => {
    const fetchAllUser = async () => {
      try {
        const res = await axios.get(`http://localhost:8800/course/${courseid}`);
        setCourse(res.data);
        const res1 = await axios.get("http://localhost:8800/author");
        setAuthor(res1.data);
      } catch (err) {
        console.log(err);
      }
    }
    fetchAllUser();
  }, [courseid]);

  const getAuthor = (id) => {
    const aut1 = author.find((aut) => aut.ID === id);
    return aut1 ? aut1.name : 'Unknown User';
  };

  const navigate = useNavigate();

  const handleBuyCourse = () => {
    navigate(`/buycours?courseId=${courseid}`);
  };

  const handleLinkCourse = () => {
    navigate(`/linkcours?courseId=${courseid}`);
  };

  return (
    <div className="mainv">
      {course.map((cour) => (
        <div key={cour.ID} className="course-container">
          <div className="left-section">
            <img className="imgcours" src={`http://localhost:8800/course/image/${cour.ID}`} alt={course.name} />
            <div className="author">
              Автор курса: 
              <button className="authorbut">
                <Link to={`/authorpage/${cour.ID_author}`}>{getAuthor(cour.ID_author)}</Link>
              </button>
            </div>
          </div>
          <div className="right-section">
            <div className="namecours">{cour.name}</div>
            <div className="opi">Описание курса:</div>
            <div className="disc">{cour.descriptions}</div>
            <div className="price">{cour.price} рублей</div>
            <div className="box">
              <button className="buybut" onClick={handleBuyCourse}>Купить</button>
              <button className="sendbuy" onClick={handleLinkCourse}>Записаться на онлайн обучение</button>
            </div>
            <div>
              
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default OneCourse;
