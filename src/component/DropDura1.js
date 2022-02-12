import React, { useState, useContext } from "react"
import Select from "react-select"
import "../App.css"

import { db } from "../config/firebase"
import { time1, time2, time3, time4 } from "../dataTime/index"
import { useHistory } from "react-router-dom"
import { contextSession } from "../App"

function DropDura1({ state }) {
  const {
    detail,
    session,
    check,
    setCheck,
    getRange,
    getTimeRange,
    setTime,
    setType,
    getTime,
    getType,
  } = useContext(contextSession)
  const history = useHistory()

  const seletTime = () => {
    if (getRange === "1") {
      return time1
    } else if (getRange === "2") {
      return time2
    } else if (getRange === "3") {
      return time3
    } else if (getRange === "4") {
      return time4
    }
  }

  const type = [
    {
      type: "กยศ.",
    },
    {
      type: "กรอ.",
    },
  ]

  const handleOnChange = (obj) => {
    setType(obj)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // console.log("test");
    // window.location.reload()
    let id = localStorage.getItem("studentID")

    if (getType && getTime) {
      if (check) {
        const pushData = {
          studentID: detail.studentID,
          range: getRange,
          timerange: getTimeRange,
          time: getTime,
          type: getType.type,
          email: session.cerrentUser.email,
        }
        db.database().ref("Data").child(detail.id).remove()
        db.database().ref(`Data`).push(pushData)
      } else {
        const pushData = {
          range: getRange,
          timerange: getTimeRange,
          time: getTime,
          type: getType.type,
          studentID: id,
          email: session.cerrentUser.email,
        }
        // console.log(pushData)
        db.database().ref(`Data`).push(pushData)

        setCheck(true)

        localStorage.setItem("time", getTime)
        localStorage.setItem("type", getType)
      }
      history.push("/Detail")
    } else {
      alert("โปรดเลือกเวลาและประเภทของคุณ")
    }
  }

  const handleClear = (e) => {
    e.preventDefault()
    setType(null)
    setTime(null)
  }

  const toggleActive = (index) => {
    if (getTime === index) return "active btn btn-outline-dark btn-sm"
    else return "inactive btn btn-outline-dark btn-sm"
  }

  return (
    <center>
      <div>
        <div className="p3">{`ช่วงที่ ${getRange} เวลา ${getTimeRange} น.`}</div>

        <div>
          กรุณาเลือกเวลา<br></br>
          {/* {`${detail.timerange} น.`} */}
          {/* <Select 
                 value={getTime}
                options={seletTime()}
                onChange={handleChange1}
                isOptionDisabled={(options) => options.isDisabled}
                getOptionLabel={(options) => options.time}
                required
                
              /> */}

            <div
              style={{
                justifyContent: "center",
                display: "grid",
                gridTemplateColumns: "repeat(7,5rem)",
                gridGap: 5,
                padding: "20px",
                width: "650px",
                backgroundColor: "white",
                borderRadius: "20px",
              }}
            >
              {seletTime().map((val) => {
                return (
                  <div key={val.key}>
                    <button
                      type="button"
                      onClick={() => {
                        setTime(val.time)
                      }}
                      className={toggleActive(val.time)}
                    >
                      {val.time}
                    </button>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        <div>
          <div>
            <br></br>
            กรุณาเลือกประเภท
            <div style={{ width: "150px" }}>
              <Select
                style={{ width: "10px" }}
                value={getType}
                options={type}
                onChange={handleOnChange}
                required
                getOptionLabel={(options) => options.type}
              />
            </div>
          </div>
        </div>
     

      <div className="btcr">
        <button
          class="btn btn-success"
          style={{ padding: "8px" }}
          onClick={handleSubmit}
        >
          ยืนยัน
        </button>
        <button
          type="reset"
          class="btn btn-danger"
          style={{ margin: "100px" }}
          onClick={handleClear}
        >
          ล้าง
        </button>
      </div>
    </center>
  )
}
export default DropDura1
