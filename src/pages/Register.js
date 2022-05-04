import React, { useState } from "react"
import firebase, {auth} from "../config/firebase"

export const ValidateEmail = (email) => {
  if (email.length !== 27) return false
  let checkDomain = email.slice(10)
  if (checkDomain !== "@phuket.psu.ac.th") return false
  let checkID = /^-?\d+$/.test(email.slice(0, 10))
  if (!checkID) return false

  return true
}

const Register = () => {
  const [email, setEmail] = useState("")
  const [pwd, setPwd] = useState("")
  const [conPwd, setConPwd] = useState("")
  const [validateEmail, setValidateEmail] = useState(false)
  const [validatePwd, setValidatePwd] = useState(false)
  const [validateConPwd, setValidateConPwd] = useState(false)

  return (
       <div><center>
    <div>
      <h1 className="h1">
    
        
        <br></br>
        <br></br>
        &emsp;&emsp;ระบบจองคิวสำหรับกองทุนกู้ยืมกยศ./กรอ.
      </h1>
    </div>
  </center>
          <center>
          <div className="Box">
   
        <h3>Register</h3>

        <div className="form-group">
          <label>Gmail phuket.psu.ac.th</label>
          <input
            style={{
              background: validateEmail && "#98FB98",
            }}
            required
            type="email"
            className="form-control"
            placeholder="64xxxxxxx@phuket.psu.ac.th"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
              const val = ValidateEmail(e.target.value)
              setValidateEmail(val)
            }}
          />
        </div>


        
        <div className="form-group">
          <label>Password</label>
          <input
            required
            type="password"
            className="form-control"
            placeholder="Enter password"
            value={pwd}
            onChange={(e) => {
              setPwd(e.target.value)
              if (e.target.value.length > 5) return setValidatePwd(true)
              else return setValidatePwd(false)
            }}
            style={{
              background: validatePwd && "#98FB98",
            }}
          />
        </div>
        <div className="form-group">
          <label>Confirm Password</label>
          <input
            required
            type="password"
            className="form-control"
            placeholder="Enter password"
            value={conPwd}
            onChange={(e) => {
              setConPwd(e.target.value)
              if (!validatePwd) return setValidateConPwd(false)
              if (pwd === e.target.value) return setValidateConPwd(true)
              else return setValidateConPwd(false)
            }}
            style={{
              background: validateConPwd && "#98FB98",
            }}
          />
        </div>
        <button
          class="btn btn-dark"
          onClick={() => {
            if(!validateEmail) return alert("Please check your email address")
            if(!validatePwd) return alert("Please check your password")
            if(!validateConPwd) return alert("Please confirm your password")
    
            firebase.auth()
              .createUserWithEmailAndPassword(email,pwd )
              .then((userCredential) => {
                // console.log(userCredential)
              })
              .catch((e) => {
                console.error(e)
                alert(e.message)
              })
          }}
        >
          Register
        </button>
  
    </div>
      </center>
    
           </div>
    
       
   
      
  )
}

export default Register