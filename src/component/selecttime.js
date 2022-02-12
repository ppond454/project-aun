import React, { useState, useContext } from "react";
import Select from "react-select";
import '../App.css'

import { db } from "../config/firebase"

import { time1, time2, time3, time4 } from '../time/Alltime';
import { useHistory } from "react-router-dom"
import { contextSession } from "../App"
import Table1 from "../time/table1";
function SelectTime({ state }) {
    const { detail,
      session,
      check,
      setCheck,
      getRange,
      getTimeRange,
      setTime,
      setType,
      getTime,
      getType, } = useContext(contextSession)
    const history = useHistory()
  
    const selectTime = () => {
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
            studentID: id,
            range: getRange,
            timerange: getTimeRange,
            time: getTime.time,
            type: getType.type,
            email: session.cerrentUser.email,
          }
          db.database().ref("Data").child(detail.id).remove()
          db.database().ref(`Data`).push(pushData)
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
     
  <center>
     <div>
        <div className="p3">{`ช่วงที่ ${getRange} เวลา ${getTimeRange} น.`}</div> 
        <div >
          <div class="row">
            <div class="col-sm-3">
              <div className="drop" >
                กรุณาเลือกเวลา<br></br>
                {/* {`${detail.timerange} น.`} */}
              
                
              </div>
            </div>
  
  
  
            <div class="col-sm-3">
              <div className="drop" >
                <br></br>
                กรุณาเลือกประเภท
                <Select
                 value={getType}
                  options={type}
                  onChange={handleOnChange}
                  required
                  getOptionLabel={(options) => options.type}
                />
               
              </div>
            </div>
            <div className="btcr">
              <button class="btn btn-success" style={{padding: "8px"}} onClick={handleSubmit}>
                ยืนยัน
              </button>
              <button type="reset" class="btn btn-danger"style={{margin: "100px"}} onClick={handleClear}>
                ล้าง
              </button>
            </div>
          </div>
        </div>
      </div>
  </center>
       
    )
  }
  export default SelectTime