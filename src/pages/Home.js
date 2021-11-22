import React, { useContext } from "react"
import Student from "../component/Student"
import { contextSession } from "../App"
import "../App.css"
import { Redirect } from "react-router-dom"

export default function Home() {
  const { check } = useContext(contextSession)
  console.log(check)

  return (
    <div>
      {check ? (
        <Redirect to="/Detail" />
      ) : (
        <>
          {!sessionStorage.getItem("check") ? (
            <Student />
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
