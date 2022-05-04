import React, { useState, useContext } from "react"
import { Calendar } from "antd"
import { Redirect } from "react-router-dom"
import moment from "moment"
import { firestore } from "firebase"
import "antd/dist/antd.css"
import DropDura1 from "../component/DropDura1"
import Duration1 from "../component/Duration"
import { contextSession } from "../App"
import "../App.css"

export default function Queue() {
  const { check, getRange, setRange, setSelectedDate, selectedDate, detail } =
    useContext(contextSession)

  const [dateStart, setDateStart] = useState(moment())
  const [dateEnd, setDateEnd] = useState(moment())
  let value
  React.useEffect(() => {
    const db = firestore()
    let start = ""
    let end = ""

    const unsub = db
      .collection("date")
      .doc("dates")
      .onSnapshot((doc) => {
        if (doc.data().start) {
          start = doc.data().start
        }
        if (doc.data().end) {
          end = doc.data().end
        }
        let _start = moment(moment(start, "DD/MM/YYYY").format("YYYY-MM-DD"))
        let _end = moment(moment(end, "DD/MM/YYYY").format("YYYY-MM-DD"))
        setDateStart(_start)
        setDateEnd(_end)
      })

    return () => unsub()
  }, [])
  console.log(dateStart, dateEnd)
  if (detail?.date) {
    value = moment(detail.date, "YYYY-MM-DD")
  } else {
    value = dateStart
  }

  const onSelectDate = (value) => {
    setSelectedDate(value.format("YYYY-MM-DD"))
    localStorage.setItem("date", value.format("YYYY-MM-DD"))
  }

  return (
    <div>
      {/* {!check && !localStorage.getItem("studentID") && <Redirect to="/Home" />} */}
      {selectedDate ? (
        <>{getRange ? <DropDura1 /> : <Duration1 />} </>
      ) : (
        // <Duration1  />
        <div className="calendar">
          กรุณาเลือกวันจองส่งเอกสาร<br></br>
          <Calendar
            onSelect={onSelectDate}
            value={value}
            validRange={[dateStart, dateEnd]}
          />
        </div>
      )}

      {selectedDate && (
        <div className="back">
          <button
            class="btn btn-dark"
            style={{ margin: "30px" }}
            onClick={() => setSelectedDate(null)}
          >
            ย้อนกลับ
          </button>
        </div>
      )}

      {getRange && (
        <div className="back">
          <button
            class="btn btn-dark"
            style={{ margin: "30px" }}
            onClick={() => setRange(null)}
          >
            ย้อนกลับ
          </button>
        </div>
      )}
    </div>
  )
}
