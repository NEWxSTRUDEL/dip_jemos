// Authorpage.js
import React, { useEffect, useState } from 'react';
import './authorpage.css';
import axios from 'axios';
import { useLocation, Link } from 'react-router-dom';

function Authorpage() {
  const [author, setAuthor] = useState([]);
  const [courses, setCourses] = useState([]);

  const location = useLocation();
  const authorid = location.pathname.split("/")[2];

  axios.defaults.withCredentials = true;

  useEffect(() => {
    const fetchAllUser = async () => {
      try {
        const res = await axios.get(`http://localhost:8800/author/${authorid}`);
        setAuthor(res.data);
        const res1 = await axios.get("http://localhost:8800/course");
        const filteredCourses = res1.data.filter(course => course.ID_author === parseInt(authorid, 10));
        setCourses(filteredCourses);
      } catch (err) {
        console.error(err);
      }
    }
    fetchAllUser();
  }, [authorid]);

  return (
    <div className='mainwin'>
      {author.map((auth) => (
        <div key={auth.ID} className="author-details">
          <h1>{auth.name} {auth.surname} {auth.patronymic}</h1>
          <p>{auth.descriptions}</p>
        </div>
      ))}

      <main className="course-list">
        {courses.map((cour) => (
          <div className="course-card" key={cour.ID}>
            <h2>{cour.name}</h2>
            <p>{cour.price} руб.</p>
            <Link className='course-link' to={`/course/${cour.ID}`}>Узнать больше о курсе</Link>
          </div>
        ))}
      </main>
    </div>
  );
}

export default Authorpage;
