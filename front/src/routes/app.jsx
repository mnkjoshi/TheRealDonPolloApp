import { Outlet, useNavigate, useLocation } from "react-router-dom";
import axios from 'axios'
import Authenticate  from "../components/authenticate.jsx";
import React, { useEffect, useState } from 'react';
let DisplayData

import hind_entry from "../assets/HindEntry.jpg";

export default function App() {  
    let location = useLocation();
    const navigate = useNavigate();


    let user = localStorage.getItem("user")
    let token = localStorage.getItem("token")
    useEffect(() => {
        if (user == null) {
            navigate('/auth')
        } else {
            
        }
    })


    return (
        <div className= "app-main" id= "app-main">
            <p className= "app-title">Trying to work? Don pollo will call you {";)"}</p>
            <img src= {hind_entry}></img>
            
            <div className= "app-box" id= "phone-entry">
                <p className= "app-box-info" id= "app-box-user">Phone #</p>
                <input className= "app-box-input" id= "app-user-input"autoComplete="off"></input>
                <button className= "app-entry" onClick={() => console.log("HI")}>BEGIN</button>
            </div>
        </div>
    );
  }