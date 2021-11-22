import React, { useContext, useRef } from "react"
//import auth from 'firebase';
import { useHistory } from "react-router-dom"
import "../App.css"
import { auth } from "../config/firebase"
import { contextSession } from "../App"

const Login = () => {

  const { setSession } = useContext(contextSession)
  // const [Username, setUsername] = useState("") //studentID
  // const [password, setPassword] = useState("") //password
  const userRef = useRef() // ใช้ useRef แทน useState ***ศึกษาเรื่อง useRef
  const pwRef = useRef()

  const handleLogin = async () => {
    const Username = userRef.current.value
    const password = pwRef.current.value

    if (Username && password) {
      // เช็คว่าได้กรอก email กับ password ?
      try {

        await auth.signInWithEmailAndPassword(Username, password)
        // history.push("/Home") // เมื่อ login สำเร็จ redirectไปหน้า home
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

  // const handleUsername = (Event) => {
  //   setUsername(Event.target.value)
  // } //studentID
  // const handlePassword = (Event) => {
  //   setPassword(Event.target.value)
  // } //password

  return (
    <div>
      <div>
        <img src="estudent.jpg" alt="logo" width="200px"></img>{" "}
      </div>
      <center>
        <div>
          <h1 className="h1">
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
            type="Email"
            placeholder="Your E-mail"
            class="holder"
            // onChange={handleUsername}
            ref={userRef}
          />
          <p></p>
          <input
            type="password"
            placeholder="Password"
            class="holder"
            ref={pwRef}
            // onChange={handlePassword}
          />
          <br></br>
          <br></br>
          <button
            type="button"
            class="button:hover"
            class="button"
            onClick={handleLogin}
          >
            Login
          </button>
        </div>
      </center>
    </div>
  )
}

export default Login
