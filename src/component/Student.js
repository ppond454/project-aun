import React, { useState, useContext } from "react"
import { useHistory } from "react-router-dom"
import "../App.css"
import { contextSession } from '../App';
import { db } from '../config/firebase';
function Student({ SetDetail }) {
  const { rawData } = useContext(contextSession)
  const history = useHistory()
  const [id, setId] = useState("")
  const handleOnChange = (e) => {
    const value = e.target.value.replace(/\D/g, "") //รับเฉพาะเลข
    setId(value)
  }

  const handleID = (e) => {
    e.preventDefault()

    if (id.length === 10) {
      // กำหนดรหัสนักศึกษา10 ตัว

      const checkID = rawData.filter((val) => {
        return val.studentID === id
      })
      console.log(checkID.length)

      if (checkID.length === 0) {
        localStorage.setItem("studentID", id)
        history.push("/Queue")
      } else {
        alert("รหัสนักศึกษานี้ลงทะเบียนเเล้ว ไม่สามารถลงซ้ำได้")
      }
    } else if(id.length < 10) {
      alert("ท่านใส่รหัสนักศึกษาไม่ครบ")
    }
    else if(id.length > 10) {
      alert("ท่านใส่รหัสนักศึกษาเกิน")
    }

  }

  return (
    <div >
      <div>
        <center>
          <div className="Boxtodo" style={{margin:"200px",padding:"20px"}}>
          
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <input type="text" onChange={handleOnChange} value={id} />
            <br></br>
            <br></br>
            <br></br>
            
            

            <button type="button" class="btn btn-dark" onClick={handleID}>
              Add
            </button>
          </div>
        </center>
      </div>
    </div>
  )
}

export default Student