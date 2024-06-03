import React, { useEffect, useState } from 'react';
import "./Admin.css";
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

function Updatacourse() {
  const [cours, setCours] = useState({
    name: "",
    price: "",
    date: "",
    ID_type: "",
    ID_author: "",
    descriptions: "",
    link: "",
    Download: "",
    img: null,
  });

  const [onecourse, setСourse] = useState([]);
  const [author, setAuthor] = useState([]);
  const [type, setType] = useState([]);
  
  const nav = useNavigate();
  const location = useLocation();
  const courseid = location.pathname.split("/")[2];

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const res = await axios.get("http://localhost:8800/author");
        setAuthor(res.data);

        const res1 = await axios.get("http://localhost:8800/type");
        setType(res1.data);

        const res2 = await axios.get("http://localhost:8800/course/" + courseid);
        setСourse(res2.data);      
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllData();
  }, [courseid]);

  const handleChange = (e) => {
    setCours((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFileChange = (e) => {
    setCours((prev) => ({ ...prev, img: e.target.files[0] }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", cours.name);
    formData.append("price", cours.price);
    formData.append("date", cours.date);
    formData.append("ID_type", cours.ID_type);
    formData.append("ID_author", cours.ID_author);
    formData.append("descriptions", cours.descriptions);
    formData.append("link", cours.link);
    formData.append("Download", cours.Download);
    if (cours.img) {
      formData.append("img", cours.img);
    }

    try {
      await axios.put("http://localhost:8800/course/" + courseid, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      nav("/admin");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='mainvin2'>
      {onecourse.map((onecou) => (
        <div key={onecou.ID}>
          <h1>Обновить курс {onecou.name}</h1>
          <div className='form-group'>
            <input type='text' onChange={handleChange} placeholder={onecou.name} name='name'/>
          </div>
          <div className='form-group'>
            <input type='text' onChange={handleChange} placeholder={onecou.price} name='price'/>
          </div>
          <div className='form-group'>
            <select  onChange={handleChange} size="1" name="ID_type">
              {type.map((ty) => (
                <option key={ty.ID} value={ty.ID}> {ty.name} </option>
              ))}
            </select>
          </div>
          <div className='form-group'>
            <input type='date' onChange={handleChange} name='date'/>
           </div> 
           <div className='form-group'>
            <select onChange={handleChange} size="1" name="ID_author">
              {author.map((aut) => (
                <option key={aut.ID} value={aut.ID}> {aut.name} </option>
              ))}
            </select>
          </div>
          <div className='form-group'>
            <input className='form-group' type='text' onChange={handleChange} placeholder={onecou.descriptions} name='descriptions'/>
          </div>
          <div className='form-group'>
            <input className='form-group' type='text' onChange={handleChange} placeholder='Ссылка' name='link'/>
          </div>
          <div className='form-group'>
            <input className='form-group' type='text' onChange={handleChange} placeholder='Курс для скачивания' name='Download'/>
            <input className='form-group' type='file' onChange={handleFileChange} name='img'/>
          </div>
           
          </div>
      ))}
      <button className='butnext' onClick={handleClick}>Обновить</button>
    </div>
  );
}

export default Updatacourse;
