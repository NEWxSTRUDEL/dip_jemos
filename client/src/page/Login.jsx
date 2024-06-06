import React, { useState } from 'react';
import "./xreg-log.css";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const [values, setValues] = useState({});
  const [inputBorderColor, setInputBorderColor] = useState("");
  const [opacity1, setOpacity] = useState(0);
  const navigate = useNavigate();

  const handleChange = (event) => {
    setValues(prev => ({ ...prev, [event.target.name]: event.target.value }));
  };

  axios.defaults.withCredentials = true;
  
  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8800/login", values);
      if (res.data.Login) {
        window.localStorage.setItem("isLogedIn", true);
        navigate("/");
        window.location.reload();
      } else {
        setInputBorderColor("red");
        setOpacity(1);
        setTimeout(() => {
          setOpacity(0);
          setInputBorderColor("");
        }, 3000);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
    <div className="register-form-container">
      <h2>Войти</h2>
      <form className="register-form">
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            onChange={handleChange}
            required
            style={{ border: `2px solid ${inputBorderColor}`, transition: "0.3s ease-in-out" }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Пароль</label>
          <input
            type="password"
            name="password"
            onChange={handleChange}
            required
            style={{ border: `2px solid ${inputBorderColor}`, transition: "0.3s ease-in-out"}}
          />
        </div>
        <button onClick={handleClick} className="submit-button">Войти</button>
      </form>
      <p className="login-link">
        У вас нет учетной записи? <a href="/register">Зарегаться</a>
      </p>
    </div>
    <div className='errorword' style={{opacity: `${opacity1}`, color: "red", transition: "0.3s ease-in-out"}}>Не верно введён пароль или email</div></div>
  );
}

export default Login;
