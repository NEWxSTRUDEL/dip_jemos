import React from 'react'
import { Route, Routes } from 'react-router-dom'

import App from "./App.js"
import Registration from "./page/Registration.jsx"
import Login from "./page/Login.jsx"
import Admin from "./adminpages/Admin.jsx"
import Info from "./page/info.jsx"
import OneCourse from './course/OneCourse.jsx'
import Userupdata from "./adminpages/userupdata.jsx"
import Updataauthor from './adminpages/updataauthor.jsx'
import Addauthor from './adminpages/addauthor.jsx'
import Addtype from './adminpages/addtype.jsx'
import Addcours from './adminpages/addcours.jsx'
import Updatacourse from './adminpages/updatacourse.jsx'
import Updatatype from "./adminpages/updatatype.jsx"
import Profile from './page/Profile.jsx'
import Buycours from './page/buycourse.jsx'
import Authorpage from './page/authorpage.jsx'
import Nicebuy from './page/nicebuy.jsx'
import Limkcours from './page/linkcours.jsx'
import Adminstatus from './adminpages/adminstatus.jsx'
import Sendcours from './page/sendcours.jsx'

function Routepage() {
    return (
        <Routes>
            <Route path="/" element={<App/>}/>
            <Route path="/register" element={<Registration/>}/>
            <Route path="/login" element={<Login />}/>
            <Route path="/admin" element={<Admin />}/>
            <Route path='/info' element={<Info />}/>
            <Route path='/updatauser/:ID' element={<Userupdata />}/>
            <Route path='/addauthor' element={<Addauthor />}/>
            <Route path='/updataauthor/:ID' element={<Updataauthor />}/>
            <Route path='/addtype' element={<Addtype />}/>
            <Route path='/course/:ID' element={<OneCourse />}/>
            <Route path='/addcours' element={<Addcours />}/>
            <Route path='/profile' element={<Profile />}/>
            <Route path='/updatacourse/:ID' element={<Updatacourse />}/>
            <Route path='/updatatype/:ID' element={<Updatatype />}/>
            <Route path='/buycours' element={<Buycours />}/>
            <Route path='/authorpage/:ID' element={<Authorpage />}/>
            <Route path='/nicebuy' element={<Nicebuy />}/>
            <Route path='/linkcours' element={<Limkcours />}/>
            <Route path='/adminstatus' element={<Adminstatus />}/>
            <Route path='/sendcours' element={<Sendcours />}/>
        </Routes>
    )
}

export default Routepage