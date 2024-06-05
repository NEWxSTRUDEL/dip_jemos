import React, { useEffect, useState } from 'react';
import "./Admin.css";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Notification from "./Notification"

function Addcours() {
  const [cours, setCours] = useState({
    name: "",
    price: "",
    date: "",
    ID_type: "",
    ID_author: "",
    descriptions: "",
    link: "",
    Download: ""
  });

  const [showNotification, setShowNotification] = useState(false);
  const [img, setImg] = useState(null);
  const nav = useNavigate();
  const [author, setAuthor] = useState([]);
  const [type, setType] = useState([]);

  useEffect(() => {
    const fetchAllUser = async () => {
      try {
        const res = await axios.get("http://localhost:8800/author");
        setAuthor(res.data);
        const res1 = await axios.get("http://localhost:8800/type");
        setType(res1.data);
      } catch (err) {
        console.log(err);
      }
    }
    fetchAllUser();
  }, []);


  useEffect(() => {
    if (showNotification) {
      const timer = setTimeout(() => {
        setShowNotification(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [showNotification]);


  const handleChange = (e) => {
    setCours((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFileChange = (e) => {
    setImg(e.target.files[0]);
  };

  const handleClick2 = () => {
    setShowNotification(true);
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
    formData.append("img", img);



    try {
      await axios.post("http://localhost:8800/course", formData, {
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
      <h1>Добавить курс</h1>
      <div className='form-group'>
        <input type='text' onChange={handleChange} placeholder='Название' name='name' />
      </div>
      <div className='form-group'>
        <input type='text' onChange={handleChange} placeholder='Цена' name='price' />
      </div>
      <div className='form-group'>
        <select onChange={handleChange} name="ID_type">
          <option value="" disabled selected>Выберите тип курса</option>
          {type.map((ty) => (
            <option key={ty.ID} value={ty.ID}> {ty.name} </option>
          ))}
        </select>
      </div>
      <div className='form-group'>
        <input type='date' onChange={handleChange} name='date' />
      </div>
      <div className='form-group'>
        <select onChange={handleChange} name="ID_author">
          <option value="" disabled selected>Выберите автора</option>
          {author.map((aut) => (
            <option key={aut.ID} value={aut.ID}> {aut.name} </option>
          ))}
        </select>
      </div>
      <div className='form-group '>
        <textarea type='text' onChange={handleChange} placeholder='Описание' name='descriptions' />
      </div>
      <div className='form-group'>
        <input type='text' onChange={handleChange} placeholder='Ссылка' name='link' />
      </div>
      <div className='form-group'>
        <input type='text' onChange={handleChange} placeholder='Курс для скачивания' name='Download' />
      </div>
      <div className='form-group'>
        <input type="file" onChange={handleFileChange} required />
      </div>
      <button className='butnext' onClick={handleClick}>Добавить</button>
      <button className='butnext' onClick={handleClick2}>проверка</button>
      <Notification show={showNotification} />
    </div>
  );
}

export default Addcours;
