import React, { useState, useContext } from "react"
import Select from "react-select"
import "../App.css"
import { db } from "../config/firebase"
import { useHistory } from "react-router-dom"

import { time1, time2, time3, time4 } from "../dataTime/index"
import { contextSession } from "../App"

function DropDura1() {
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

  const handleChange1 = (obj) => {
    setTime(obj)
  }

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
          range: getRange,
          timerange: getTimeRange,
          time: getTime.time,
          type: getType.type,
        }
        db.database().ref("Data").child(detail.id).update(pushData)
      } else {
        const pushData = {
          range: getRange,
          timerange: getTimeRange,
          time: getTime.time,
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
    console.log("test")
    setType(null)
    setTime(null)
  }

  return (
    <div>
      <div className="dheader">{`ช่วงที่ ${getRange} เวลา ${getTimeRange} น.`}</div>

      <div className="rowDrop">
        <div class="row">
          <div class="col-sm-3">
            <div className="App" className="Drop1">
              กรุณาเลือกเวลา<br></br>
              {/* {`${detail.timerange} น.`} */}
              <Select
                value={getTime}
                options={seletTime()}
                onChange={handleChange1}
                isOptionDisabled={(options) => options.isDisabled}
                getOptionLabel={(options) => options.time}
                required
              />
              <b>เวลาที่คุณเลือกคือ</b>
              <pre>{JSON.stringify(getTime, null, 2)}</pre>
            </div>
          </div>

          <div class="col-sm-3">
            <div className="App" className="Drop2">
              <br></br>
              กรุณาเลือกประเภท
              <Select
                value={getType}
                options={type}
                onChange={handleOnChange}
                required
                getOptionLabel={(options) => options.type}
              />
              <b>ประเภทที่คุณเลือกคือ</b>
              <pre>{JSON.stringify(getType, null, 2)}</pre>
            </div>
          </div>
          <div class="col-sm-3">
            <button class="btn btn-success" onClick={handleSubmit}>
              ยืนยัน
            </button>
            <button type="reset" class="btn btn-danger" onClick={handleClear}>
              ล้าง
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
export default DropDura1
