import React, { useContext } from 'react'
import "../App.css"
import { contextSession } from "../App"
import { useHistory } from "react-router-dom"
import { db } from "../config/firebase"

export default function Detail() {
  const history = useHistory()

  const { detail,check,} = useContext(contextSession)
  

  console.log("Check",check)
  console.log("Check Session:",sessionStorage.getItem("check"))
 console.log(detail)
  return (
    <>
   {!sessionStorage.getItem("check") && !check ? history.push("/Queue") : null }
   <body >
       <div >  
         <center>
        <h1 className="p3"> รายละเอียดการจอง </h1>
       
          
           <div className="detailbox"  >
         <div classname="middlede">{
           detail.studentID &&<>
           <br></br> <br></br> <br></br><br></br><br></br>
            <h2>{`Email: ${detail.email}`}</h2>
          <h2>{`รหัสนักศึกษา ${detail.studentID}`}</h2>
          <h2>{`วันที่ ${detail.date}`}</h2>
          <h2>{`ช่วงที่ ${detail.range}`}</h2>
          <h3>{`ช่วงเวลา ${detail.timerange}`}</h3>
          <p>{`เวลาที่เลือก ${detail.time}`}</p>
          <p>{`ประเภท ${detail.type}`}</p>
         
         <br></br><br></br>
          <button type="button" onClick={()=> history.push("/Queue")}  class="btn btn-danger">แก้ไขข้อมูล</button></>
          }
          {
            !detail.studentID && <h2>Loading...</h2>
          }
         </div>

        </div>
        
        </center>
        
       
      </div>
   </body>
    
    </>
  )
}