import React, { useContext } from "react"
import Student from "../component/Student"
import { contextSession } from "../App"
import "../App.css"
import { Redirect } from "react-router-dom"

export default function Home() {
  const { SetDetail, check } = useContext(contextSession)

  console.log(check)
  console.log(sessionStorage.getItem("session"))
  return (
    <div>
      {check ? (
        <>
          <Redirect to="/Detail" />
          <h3>...loading</h3>
        </>
      ) : (
        <>
          {!sessionStorage.getItem("check") ? (
            <Student SetDetail={SetDetail} />
          ) : (
            <div align="center">
              <h>....loading</h>
            </div>
          )}
        </>
      )}
    </div>
  )
}
