import React, { useEffect, useState } from 'react';
import axios from "axios"
import "./Admin.css";

function Adminstatus() {
    //чтения бд
    const [user,setUser] = useState([])
    const [course,setСourse] = useState([])
    const [admtrue,setAdmtrue] = useState([])
    const [buy,setBuy] = useState([])
    const [buydate,setBuydate] = useState([])
    

    axios.defaults.withCredentials = true;
    useEffect(()=>{
        const fecthAllUser = async () =>{
            try{
                const res2 = await axios.get("http://localhost:8800")
                const res3 = await axios.get("http://localhost:8800/buy_course")
                const res4 = await axios.get("http://localhost:8800/date_course")
                setBuydate(res4.data)
                setBuy(res3.data)
                setAdmtrue(res2.data.role);

            }catch(err){
                console.log(err)
            }
        }
        fecthAllUser()
    },[])


    useEffect(()=>{
        const fecthAllUser = async () =>{
            try{
                const res = await axios.get("http://localhost:8800/User")
                setUser(res.data);
            }catch(err){
                console.log(err)
            }
        }
        fecthAllUser()
    },[])



    useEffect(()=>{
        const fecthAllUser = async () =>{
            try{
                const res = await axios.get("http://localhost:8800/course")
                setСourse(res.data);
            }catch(err){
                console.log(err)
            }
        }
        fecthAllUser()
    },[])

    

    const hendelDeletebuy = async (ID)=> {
        try{
            await axios.delete("http://localhost:8800/buy/"+ID)
            console.log(ID)
            window.location.reload()
            
        }catch(err){
            console.log(err)
        }
    } 
    
  
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

        const getsumbuy = (id) => {
            const purchases = buy.filter((purchase) => purchase.id_course === id);
            // Возвращаем количество найденных покупок
            return purchases.length;
        };

        const getsumbuydate = (id) => {
            const purchases = buydate.filter((purchase) => purchase.id_course === id);
            // Возвращаем количество найденных покупок
            return purchases.length;
        };


   if(admtrue === "adm"){
    return (
        <div className='mainvin'>
          
                <div className='admin-section'><b>Курсы </b></div>
                <div className="text">{course.map((cour)=>(
                    <div className="alluse" key={cour.ID}>
                        <a aria-current="page"  href="/#" >{cour.ID} = {cour.name} {cour.price} {cour.typeid} {cour.authorid}. Это курс купили: 
                        <a aria-current="page"  href="/#" >{getsumbuy(cour.ID)}</a> На него записана: <a aria-current="page"  href="/#" >{getsumbuydate(cour.ID)}</a> человек.
                        </a>
                         
                    </div>
                ))}
                </div>


                <div className='admin-section'><b>куплиные курсы </b></div>
                
                <div className="text">{buy.map((b)=>(
                    <div className="alluse" key={b.ID}>

                        <a aria-current="page"  href="/#" >ID:{b.ID} Ник:{getUserName(b.id_user)} Курс:{getCourseTitle(b.id_course)} Дата:{b.date}
                        
                        </a>
                        <button onClick={() =>hendelDeletebuy(b.ID)}>del</button>
                    </div>
                ))}
                </div>


                <div className='admin-section'><b>Записаны на курсы</b></div>
                
                <div className="text">{buydate.map((b)=>(
                    <div className="alluse" key={b.ID}>

                        <a aria-current="page"  href="/#" >ID:{b.ID} Ник:{getUserName(b.id_user)} Курс:{getCourseTitle(b.id_course)} Дата записи:{b.date} Дата проведения курса {getDateCourse(b.id_course)}
                        
                        </a>
                        <button onClick={() =>hendelDeletebuy(b.ID)}>del</button>
                    </div>
                ))}
                </div>
    
           
        </div>
        )
   }else{

    return(
        <div className='errktoti'>🕷</div>
    )
   }
}

export default Adminstatus