import React, { useContext, useRef } from "react"

import "../App.css"
import Fire_store from "../config/Fire_store"
import { auth } from "../config/firebase"
import { contextSession } from "../App"
import { useHistory  } from "react-router-dom"
import { Button } from 'antd'
const Login = () => {
  
  const { setSession } = useContext(contextSession)
 const history = useHistory()
  const userRef = useRef() 
  const pwRef = useRef()

  const handleLogin = async () => {
    const Username = userRef.current.value
    const password = pwRef.current.value

    if (Username && password) {
      
      try {
        await auth.signInWithEmailAndPassword(Username, password)
      } catch (error) {
        setSession({
          isLoggedIn: false,
          currentUser: null,
          errorMessage: error.Message,
        })
        alert("Incorrect User Email and/or password")
      }
    } else {
      alert("Please put your Email and/or Password")
    }
  }

  return (
   <div>
      {/* <Fire_store/> */}
      
      <center>
        <div>
          <h1 className="h1">
        
            
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            &emsp;&emsp;ระบบจองคิวสำหรับกองทุนกู้ยืมกยศ./กรอ.
          </h1>
        </div>
      </center>
      <center>
        <div className="Box">
          <header class="pleaseinputtext">
            Please input your email and your Password /กรุณากรอก email
            และรหัสผ่าน
          </header>
          <br></br>
          <input
            type="email"
            placeholder="64xxxxxxx@phuket.psu.ac.th"
            class="holder"
            // onChange={handleUsername}
            ref={userRef}
            style={{borderRadius: "10px",border: "0px"}}
          />
          <p></p>
          <input
            type="password"
            placeholder="Password"
            class="holder"
            ref={pwRef}
            // onChange={handlePassword}
            style={{borderRadius: "10px",border: "0px"}}
          />
          <br></br>
          <br></br>
          <button
           type="button"
           class="btn btn-outline-dark"
            //class="button"
            onClick={handleLogin}
          >
            Login
          </button >

          <br></br><br></br>
          <button  type="button"
            class="btn btn-outline-dark" >
            <a href="/register" >Register</a>
          </button>
          
        </div>       
      </center>
    </div>
  )
}

export default Login