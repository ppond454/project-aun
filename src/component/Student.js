import React, { useState, useContext } from "react"
import { useHistory } from "react-router-dom"
import "../App.css"
import { contextSession } from "../App"
import { db } from "../config/firebase"
function Student({ SetDetail }) {
  const { rawData, session } = useContext(contextSession)
  const history = useHistory()
  const [id, setId] = useState("")
  const handleOnChange = (e) => {
    const value = e.target.value.replace(/\D/g, "") //รับเฉพาะเลข
    setId(value)
  }

  const handleID = (e) => {
    e.preventDefault()
    history.push("/Queue")
  }

  return (
    <div>
      <div>
        <center>
          <div className="Boxtodo" style={{ margin: "200px", padding: "20px" }}>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <p>{`Your Student ID is ${session.cerrentUser.email.slice(
              0,
              10
            )}`}</p>
            {/* <input type="text" onChange={handleOnChange} value={id} /> */}
            <br></br>
            <br></br>
            <br></br>

            <button type="button" class="btn btn-dark" onClick={handleID}>
              Next
            </button>
          </div>
        </center>
      </div>
    </div>
  )
}

export default Student