import React, { useContext, useEffect } from "react"
import Student from "../component/Student"
import { contextSession } from "../App"
import "../App.css"
import { Redirect } from "react-router-dom"

export default function Home() {
  const { SetDetail, check } = useContext(contextSession)



  return (
    <div>
      {check && (
        <>
          <Redirect to="/Detail" /> 
        </>
      )}
      <Student SetDetail={SetDetail} />
    </div>
  )
}
