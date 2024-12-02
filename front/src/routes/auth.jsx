import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios'
import React, { useState, useEffect } from 'react'

let infoToShow = "Nothing"
let infoType = "Error"
let NotificationCall
let notifyingLogin = false

export default function Auth() {  
    const [info, setInfo] = useState(0);
    const [status, setStatus] = useState(0);
    NotificationCall = setInfo
    const navigate = useNavigate();
    const { id } = useParams();
    let user = localStorage.getItem("user")

    useEffect(() => {
        if (!(user == null) && !notifyingLogin) {
            navigate('/app')
        }
    })
    return (
        <div className= "auth-main">
          {status == 0 ? <Login setStatus={setStatus} navigate={navigate}/> : <Registration setStatus={setStatus}/>}
          {info == 0 ? null : <Notification/>}
        </div>
    );
}

function Verify(Token, navigate) {
  axios({
    method: 'post',
    url: 'https://golden-hind.onrender.com/verify',
    data: {
      token: Token,
    }
  }).then((response) => {
    console.log(response.data)
    if (response.data == "UVS") {
      Notify("Success", "Account verified! Please login.")
    } else {
      Notify("Error", "An unknown error occurred! Please try again later.")
    }
    navigate("/auth")
  });
}

function Notify(InfoType, Information) {
  infoToShow = Information
  infoType = InfoType
  NotificationCall(1)
  setTimeout(function() {
    document.getElementById("auth-notification").style.opacity = 1
  }, 10)
  setTimeout(function() {
    document.getElementById("auth-notification").style.opacity = 0;
    setTimeout(function() {
      NotificationCall(0)
    }, 300)
  }, 2700)
}

function Attempt(Which, Username, Password, Email, navigate) {
  if (Which == "Login") {
    if (Username == "" || Password == "") {
      Notify("Error", "Missing information!");
      return null
    }
    if (Username== "donpollo") {
      localStorage.setItem("user", Username)
      localStorage.setItem("token", "i'll allow it")
      navigate("/app")
    }
  } else {
      
  }
}

export function Notification() {
  let color = "#21982d";
  if (infoType == "Error") {
    color = "#982121"
  } else if(infoType == "Warn") {
    color = "#edd81b"
  }
  return (
    <div className= "auth-notification" id= "auth-notification" style={{backgroundColor: color}}>
      <p className= "auth-notification-info">{infoToShow}</p>
    </div>
  )
}

export function Login({setStatus, navigate}) {


  function KeyUpSearch(event) {
    console.log("Hi??")
    if (event.key == "Enter") {Attempt("Login", document.getElementById("auth-user-input").value, document.getElementById("auth-pass-input").value, null, navigate)}
  }

  return(
    <div className= "auth-holder">
      <img className= "auth-backdrop" src = {"https://cdn-0001.qstv.on.epicgames.com/WYLTrCVIaqkOieYjWU/image/landscape_comp.jpeg"}/>
      <p className= "auth-title" id= "auth-title">Login</p>

      <div className= "auth-box" id= "username-entry">
        <p className= "auth-box-info" id= "auth-box-user">Username</p>
        <input className= "auth-box-input" id= "auth-user-input" onKeyUp={KeyUpSearch} autoComplete="off"></input>
      </div>

      <div className= "auth-box" id= "password-entry">
        <p className= "auth-box-info" id= "auth-box-pass">Selfie</p>
        <input id= "auth-pass-input" className= "auth-box-input" type="file" name="img" accept="image/*"></input>
      </div>

      <button className= "auth-entry" onClick={() => Attempt("Login", document.getElementById("auth-user-input").value, document.getElementById("auth-pass-input").value, null, navigate)}>ENTER</button>
      <button className= "auth-switch" onClick={() => setStatus(1)} onMouseEnter={() => document.getElementById("auth-switch-underline").style.width = "12%"} onMouseLeave={() => document.getElementById("auth-switch-underline").style.width = "0%"}>Don't have an account?</button>
      <div className= "auth-switch-underline" id= "auth-switch-underline"/>
    </div>
  );
}

export function Registration ({setStatus}) {

  function KeyUpSearch(event) {
    if (event.key == "Enter") {Attempt("Register", document.getElementById("auth-user-input").value, document.getElementById("auth-pass-input").value, document.getElementById("auth-email-input").value)}
  }

  return(
    <div className= "auth-holder">
      <p className= "auth-title" id= "auth-title">Register</p>

      <div className= "auth-box" id= "username-entry">
        <p className= "auth-box-info" id= "auth-box-user">Username</p>
        <input className= "auth-box-input" id= "auth-user-input" onKeyUp={KeyUpSearch} autoComplete="off"></input>
      </div>

      <div className= "auth-box" id= "email-entry">
        <p className= "auth-box-info" id= "auth-box-email">Email</p>
        <input className= "auth-box-input" id= "auth-email-input" onKeyUp={KeyUpSearch} autoComplete="off"></input>
      </div>

      <div className= "auth-box" id= "password-entry">
        <p className= "auth-box-info" id= "auth-box-pass">Password</p>
        <input className= "auth-box-input" id= "auth-pass-input" type= "password" onKeyUp={KeyUpSearch} autoComplete="off"></input>
      </div>

      <button className= "auth-entry" onClick={() => Attempt("Register", document.getElementById("auth-user-input").value, document.getElementById("auth-pass-input").value, document.getElementById("auth-email-input").value)}>ENTER</button>
      <button className= "auth-switch" onClick={() => setStatus(0)} onMouseEnter={() => document.getElementById("auth-switch-underline").style.width = "12%"} onMouseLeave={() => document.getElementById("auth-switch-underline").style.width = "0%"}>Already have an account?</button>
      <div className= "auth-switch-underline" id= "auth-switch-underline"/>
    </div>
  );
}