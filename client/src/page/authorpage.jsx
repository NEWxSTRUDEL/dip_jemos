import React, { useEffect, useState } from 'react'
import "./authorpage.css"
import axios from 'axios';
import { useLocation, Link } from 'react-router-dom';

function Authorpage() {
  const [author, setAuthor] = useState([])
  const [courses, setCourses] = useState([]);

  const location = useLocation();
  const authorid = location.pathname.split("/")[2];

  axios.defaults.withCredentials = true;
  useEffect(()=>{
    const fecthAllUser = async () =>{
        try{
            const res = await axios.get("http://localhost:8800/author/" + authorid)
            setAuthor(res.data)
            const res1 = await axios.get("http://localhost:8800/course")
            
            const filteredCourses = res1.data.filter(course => course.ID_author === parseInt(authorid, 10));
            setCourses(filteredCourses);
        }catch(err){
       
        }
    }
    fecthAllUser()
},[])

    return (   
        <div className='mainwin'>
           {author.map((auth) => (
          <div key={auth.ID}>
           <div>{auth.name} {auth.surname} {auth.patronymic}</div>
           <div>{auth.descriptions}</div>
        </div>
        ))}

<           main className="product-list">
                <div>{courses.map((cour) => (
                
                  <div className="product-card" key={cour.ID}>
                  <div>{cour.name}</div>
                  <div>{cour.price} руб.</div>
                  <button><Link className='butupdata' to={`/course/${cour.ID}`}>Узанть больше о курсе</Link></button>  
                  </div>
              ))}</div>
            </main>

      </div>
    )
}

export default Authorpage