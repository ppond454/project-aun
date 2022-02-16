import React, { useState, useContext } from "react"
import { Calendar } from "antd"
import { Redirect } from "react-router-dom"
import moment from "moment"

import DropDura1 from "../component/DropDura1"
import Duration1 from "../component/Duration"
import { contextSession } from "../App"
import "../App.css"

export default function Queue() {
  const onSelectDate = (value) => {
    setSelectedDate(value.format("YYYY-MM-DD"))
    localStorage.setItem("date", value.format("YYYY-MM-DD"))
  }
  const { check, getRange, setRange, setSelectedDate, selectedDate, detail } =
    useContext(contextSession)

  return (
    <div>
      {!check && !localStorage.getItem("studentID") && <Redirect to="/Home" />}
      {selectedDate ? (
        <>{getRange ? <DropDura1 /> : <Duration1 />} </>
      ) : (
        // <Duration1  />
        <div className="calendar">
          กรุณาเลือกวันจองส่งเอกสาร<br></br>
          {detail.date && (
            <Calendar
              onSelect={onSelectDate}
              value={moment(detail.date)}
              validRange={[moment("2022-02-16"), moment("2022-02-23")]}
            />
          )}
          {!detail.date && (
            <Calendar
              onSelect={onSelectDate}
              validRange={[moment("2022-02-16"), moment("2022-02-23")]}
            />
          )}
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
