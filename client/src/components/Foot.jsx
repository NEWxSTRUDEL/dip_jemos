import React, { useEffect, useState } from 'react';
import "./Foot.css";
import axios from 'axios';

function Foot() {

  const [valid,setValid] = useState([])
  const [admtrue,setAdmtrue] = useState([])

  useEffect(()=>{
    const fecthAllUser = async () =>{
        try{
          const res = await axios.get("http://localhost:8800")
          setValid(res.data.valid)
          const res2 = await axios.get("http://localhost:8800")
          setAdmtrue(res2.data.role);
        }catch(err){
            console.log(err)
        }
    }
    fecthAllUser()
},[])

    if(admtrue === "adm"){
      return (
        <footer>
          <div className="footer-content">
            <div className="footer-left">
              <p>&copy; {new Date().getFullYear()} Jemos. Все права защищены.</p>
            </div>
            <div className="footer-right">
              <a className='butAdmin' href='/admin'>Админ панель</a>
            </div>
          </div>
        </footer>
      );
    }else{
      return (
        <footer>
          <div className="footer-content">
            <div className="footer-left">
              <p>&copy; {new Date().getFullYear()} Jemos. Все права защищены.</p>
            </div>
          </div>
        </footer>
      );
    }

  }

export default Foot;