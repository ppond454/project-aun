import React, { useState, useContext } from "react"
import DropDura1 from "../component/DropDura1"
import Duration1 from "../component/Duration"
import { Redirect } from "react-router-dom"

import { contextSession } from "../App"

export default function Queue() {
  const { check ,getRange ,setRange } = useContext(contextSession)


  return (
    <div>
      {!check && !localStorage.getItem("studentID") && <Redirect to="/Home"/> }
      {getRange ? (
        <DropDura1 />
      ) : (
        <Duration1  />
      )}

      {getRange  ? (
        <button
          class="btn btn-outline-secondary"
          onClick={() => setRange(null)}
        >
          ย้อนกลับ
        </button>
      ) : null}
    </div>
  )
}
