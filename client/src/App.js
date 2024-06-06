import React, { useEffect, useState } from 'react';
import {Link, useNavigate} from "react-router-dom"
import axios from "axios"
import './App.css';
//import Admin from './adminpages/Admin';


function App() {
  const [course,setСourse] = useState([])
  const [value, setValuse] = useState('')
  //const [role,setRole] = useState('')

  //const nav = useNavigate();
  

  const filteredCourse = course.filter(cours => {
    return cours.name.toLowerCase().includes(value.toLowerCase())
  })

  axios.defaults.withCredentials = true;
  useEffect(()=>{
    const fecthAllUser = async () =>{
        try{
          const res = await axios.get("http://localhost:8800/course")
          setСourse(res.data);
          const res2 = await axios.get("http://localhost:8800")
          if(res2.data.valid){

          }else{
            //nav("/login");
          }
        }catch(err){
            console.log(err)
        }
    }
    fecthAllUser()
},[])


const allcours = () => {
  return(
    <div  className='allcours '>
      {filteredCourse.map((cour) => (
            <div className='onecourse' key={cour.ID}>                        
              <div><img className='imgcours2' src={`http://localhost:8800/course/image/${cour.ID}`} alt={course.name} /></div>
              <div className='namecours2'>{cour.name}</div>
              <div className='price'>{cour.price} руб. <button className='linkcours'><Link  to={`/course/${cour.ID}`}>Узнать больше о курсе</Link></button>   </div>                  
              </div>
          ))}
    </div>
  )
}

  return (
<div>
  <div className='mainwin12'>
    <header>
      <input type="text" className='poisk' onChange={(event) => setValuse(event.target.value)} placeholder="Поиск..."/> 
    </header>
      
      <main>
        <div>
          {allcours()}
          </div>
      </main>
    </div>    
  </div>
);
}

export default App;
