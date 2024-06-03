import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Admin.css';

function Admin() {
  const [user, setUser] = useState([]);
  const [author, setAuthor] = useState([]);
  const [type, setType] = useState([]);
  const [course, setCourse] = useState([]);
  const [admtrue, setAdmtrue] = useState('');
  const [buy, setBuy] = useState([]);
  const [buydate, setBuydate] = useState([]);
  const [searchUser, setSearchUser] = useState('');
  const [searchCourse, setSearchCourse] = useState('');
  const [searchAuthor, setSearchAuthor] = useState('');

  axios.defaults.withCredentials = true;

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [res1, res2, res3, res4, res5] = await Promise.all([
          axios.get('http://localhost:8800/author'),
          axios.get('http://localhost:8800'),
          axios.get('http://localhost:8800/buy_course'),
          axios.get('http://localhost:8800/date_course'),
          axios.get('http://localhost:8800/User')
        ]);
        setAuthor(res1.data);
        setAdmtrue(res2.data.role);
        setBuy(res3.data);
        setBuydate(res4.data);
        setUser(res5.data);
      } catch (err) {
        console.log('Error fetching data:', err);
      }
    };
    fetchAllData();
  }, []);

  useEffect(() => {
    const fetchCourseAndType = async () => {
      try {
        const [res1, res2] = await Promise.all([
          axios.get('http://localhost:8800/type'),
          axios.get('http://localhost:8800/course')
        ]);
        setType(res1.data);
        setCourse(res2.data);
      } catch (err) {
        console.log('Error fetching course and type:', err);
      }
    };
    fetchCourseAndType();
  }, []);

  const handleDelete = async (ID) => {
    try {
      const res = await axios.delete(`http://localhost:8800/User/${ID}`);
      console.log(`Deleting user with ID ${ID}`, res);
      if (res.status === 200) {
        setUser(user.filter((u) => u.ID !== ID));
      } else {
        console.log('Failed to delete user:', res);
      }
    } catch (err) {
      console.log('Error deleting user:', err);
    }
  };

  const handleDeleteAuthor = async (ID) => {
    try {
      const res = await axios.delete(`http://localhost:8800/author/${ID}`);
      console.log(`Deleting author with ID ${ID}`, res);
      if (res.status === 200) {
        setAuthor(author.filter((a) => a.ID !== ID));
      } else {
        console.log('Failed to delete author:', res);
      }
    } catch (err) {
      console.log('Error deleting author:', err);
    }
  };

  const handleDeleteType = async (ID) => {
    try {
      const res = await axios.delete(`http://localhost:8800/type/${ID}`);
      console.log(`Deleting type with ID ${ID}`, res);
      if (res.status === 200) {
        setType(type.filter((t) => t.ID !== ID));
      } else {
        console.log('Failed to delete type:', res);
      }
    } catch (err) {
      console.log('Error deleting type:', err);
    }
  };

  const handleDeleteCourse = async (ID) => {
    try {
      const res = await axios.delete(`http://localhost:8800/course/${ID}`);
      console.log(`Deleting course with ID ${ID}`, res);
      if (res.status === 200) {
        setCourse(course.filter((c) => c.ID !== ID));
      } else {
        console.log('Failed to delete course:', res);
      }
    } catch (err) {
      console.log('Error deleting course:', err);
    }
  };

  const handleDeleteBuy = async (ID) => {
    try {
      const res = await axios.delete(`http://localhost:8800/buy/${ID}`);
      console.log(`Deleting buy with ID ${ID}`, res);
      if (res.status === 200) {
        setBuy(buy.filter((b) => b.ID !== ID));
      } else {
        console.log('Failed to delete buy:', res);
      }
    } catch (err) {
      console.log('Error deleting buy:', err);
    }
  };
  const handleDeletelink = async (ID) => {
    try {
      const res = await axios.delete(`http://localhost:8800/linkcc/${ID}`);
      console.log(`Deleting buy with ID ${ID}`, res);
      if (res.status === 200) {
        setBuy(buy.filter((b) => b.ID !== ID));
      } else {
        console.log('Failed to delete buy:', res);
      }
    } catch (err) {
      console.log('Error deleting buy:', err);
    }
  };

  
  const getUserName = (id) => {
    const use1 = user.find((use) => use.ID === id);
    return use1 ? use1.name : 'Unknown User';
  };

  const getCourseTitle = (id) => {
    const cour = course.find((courses) => courses.ID === id);
    return cour ? cour.name : 'Unknown Course';
  };

  const getDateCourse = (id) => {
    const cour = course.find((courses) => courses.ID === id);
    return cour ? cour.date : 'Unknown Course';
  };

  const handleSearchUser = (e) => {
    setSearchUser(e.target.value);
  };

  const handleSearchCourse = (e) => {
    setSearchCourse(e.target.value);
  };

  const handleSearchAuthor = (e) => {
    setSearchAuthor(e.target.value);
  };

  const filteredUsers = user.filter((u) => u.email.toLowerCase().includes(searchUser.toLowerCase()));
  const filteredAuthors = author.filter((a) => a.name.toLowerCase().includes(searchAuthor.toLowerCase()));
  const filteredCourses = course.filter((c) => c.name.toLowerCase().includes(searchCourse.toLowerCase()));

  if (admtrue === 'adm') {
    return (
      <div className='mainvin'>
        <div className='admin-section'>
          <div><b>Пользователи </b> <button className='status'><Link className='linkk' to='/adminstatus'>Статистика</Link></button></div>
          <input
            type='text'
            placeholder='Поиск по email'
            value={searchUser}
            onChange={handleSearchUser}
            className='search-bar'
          />
        </div>
        <div className='text'>
          {filteredUsers.map((use) => (
            <div className='alluse' key={use.ID}>
              <a aria-current="page" href="/#" >{use.ID} = {use.email} {use.password} {use.role}</a>
              <button onClick={() => handleDelete(use.ID)}>del</button>
              <div className='butupdata'><Link className='linkk' to={`/updatauser/${use.ID}`}>updata</Link></div>
            </div>
          ))}
        </div>
        <div className='admin-section'><b>Авторы курсов</b>
          <input
            type='text'
            placeholder='Поиск по имени'
            value={searchAuthor}
            onChange={handleSearchAuthor}
            className='search-bar'
          />
        </div>
        <div className='text'>
          {filteredAuthors.map((aut) => (
            <div className='alluse' key={aut.ID}>
              <a aria-current="page" href="/#" >{aut.ID} = {aut.name} {aut.surname} {aut.descriptions}</a>
              <button onClick={() => handleDeleteAuthor(aut.ID)}>del</button>
              <div className='butupdata'><Link className='linkk' to={`/updataauthor/${aut.ID}`}>updata</Link></div>
            </div>
          ))}
        </div>
        <button className='butadd scale'><Link className='linkk' to={'/addauthor'}>Добвить автора</Link></button>
        <div className='admin-section'><b>Тип курса</b></div>
        <div className='text'>
          {type.map((ty) => (
            <div className='alluse' key={ty.ID}>
              <a aria-current="page" href="/#" >{ty.ID} = {ty.name}</a>
              <button onClick={() => handleDeleteType(ty.ID)}>del</button>
              <div className='butupdata'><Link className='linkk' to={`/updatatype/${ty.ID}`}>updata</Link></div>
            </div>
          ))}
        </div>
        <button className='butadd scale'><Link className='linkk' to={'/addtype'}>Добвить типа курса</Link></button>
        <div className='admin-section'><b>Курсы</b>
          <input
            type='text'
            placeholder='Поиск по названию'
            value={searchCourse}
            onChange={handleSearchCourse}
            className='search-bar'
          />
        </div>
        <div className='text'>
          {filteredCourses.map((cour) => (
            <div className='alluse' key={cour.ID}>
              <a aria-current="page" href="/#">{cour.ID} = {cour.name} {cour.price} {cour.typeid} {cour.authorid}</a>
              <button onClick={() => handleDeleteCourse(cour.ID)}>del</button>
              <div className='butupdata'><Link className='linkk' to={`/updatacourse/${cour.ID}`}>updata</Link></div>
            </div>
          ))}
        </div>
        <button className='butadd scale'><Link className='linkk' to={'/addcours'}>Добвить курс</Link></button>
        <div className='admin-section'><b>Купленные курсы</b></div>
        <div className='text'>
          {buy.map((b) => (
            <div className='alluse' key={b.ID}>
              <a aria-current="page" href="/#" >ID: {b.ID} Ник: {getUserName(b.id_user)} Курс: {getCourseTitle(b.id_course)} Дата: {b.date}</a>
              <button onClick={() => handleDeleteBuy(b.ID)}>del</button>
            </div>
          ))}
        </div>
        <div className='admin-section'><b>Записаны на курсы</b></div>
        <div className='text'>
          {buydate.map((b) => (
            <div className='alluse' key={b.ID}>
              <a aria-current="page" href="/#" >ID: {b.ID} Ник: {getUserName(b.id_user)} Курс: {getCourseTitle(b.id_course)} Дата записи: {b.date} Дата проведения курса: {getDateCourse(b.id_course)}</a>
              <button onClick={() => handleDeletelink(b.ID)}>del</button>
            </div>
          ))}
        </div>
      </div>
    );
  } else {
    return (
      <div className='errktoti'>🕷</div>
    );
  }
}

export default Admin;
