import React from 'react'
import "./authorpage.css"
import axios from 'axios';


function Nicebuy() {
 
  axios.defaults.withCredentials = true;


    return (   
        <div className='mainwin'>
            <div>Спасибо за покупку. Мы прислали курс на почту.</div>
      </div>
    )
}

export default Nicebuy