import "../App.css"
import React from "react"
import { DatePicker, Space } from "antd"
import "antd/dist/antd.css"
import moment from "moment"
import { firestore } from "firebase"
import { auth } from "../config/firebase"

export default function Admin() {
  const [date, setDate] = React.useState([])

  const dateFormat = "DD/MM/YYYY"

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
        let _start = moment(start)
        let _end = moment(end)
        setDate([_start, _end])
      })
    return () => unsub()
  }, [])

  const handleClick = (e) => {
    e.preventDefault()
    if (date.length !== 2) {
      alert("กรุณาเลือกวันที่เริ่มต้นและวันที่สิ้นสุด")
    } else {
      let start = date[0].format(dateFormat)
      let end = date[1].format(dateFormat)
      console.log(start, end)
      const db = firestore()
      db.collection("date")
        .doc("dates")
        .set({
          start: start,
          end: end,
        })
        .then(() => alert("บันทึกสำเร็จ"))
        .catch((e) => alert(e))
    }
  }

  const Status = () => {
    return (
      <div>
        <Space
          direction="vertical"
          style={{
            width: "100%",
          }}
        >
          <DatePicker.RangePicker
            format={dateFormat}
            onCalendarChange={(value) => {
              setDate(value)
            }}
            value={date}
            style={{
              width: "100%",
            }}
          />
        </Space>
      </div>
    )
  }

  return (
    <div>
      <br></br>
      <h2 className="h2ad">กรุณากำหนดวันที่</h2>

      <div className="calendaradmin">
        <p>Start-End</p>
        <Status />

        <div className="bcadmin">
          <button
            class="btn btn-success"
            onClick={handleClick}
            style={{ borderRadius: "15px" }}
          >
            ยืนยัน
          </button>{" "}
          <button
            class="btn btn-danger"
            style={{ borderRadius: "15px" }}
            onClick={(e) => {
              e.preventDefault()
              setDate([])
            }}
          >
            ล้าง
          </button>
        </div>
      </div>
    </div>
  )
}
