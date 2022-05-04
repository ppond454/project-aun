import "./App.css"
import React, { useEffect, useState, createContext } from "react"
import Login from "./pages/Login"

import "./App.css"
import Queue from "./pages/Queue"
import { Route, Redirect, useLocation } from "react-router-dom"
import Home from "./pages/Home"
import { auth, db } from "./config/firebase"
import Detail from "./pages/Detail"
import News from "./pages/News"
import Nav from "./component/Nav"
import Register from "./pages/Register"
import Admin from "./pages/Admin"
import { ValidateEmail } from "./pages/Register"
const contextSession = createContext()

function App() {
  const location = useLocation()
  const [getStudentId, setStudentId] = useState(null)
  const [getRange, setRange] = useState(null)
  const [getTimeRange, setTimeRange] = useState(null)
  const [getTime, setTime] = useState(null)
  const [getType, setType] = useState(null)
  const [selectedDate, setSelectedDate] = useState(null)

  const [session, setSession] = useState({
    isLoggedIn: false,
    cerrentUser: null,
    errorMessage: null,
    role: null,
  })

  const [check, setCheck] = useState(false)
  const [rawData, setRawData] = useState(null)

  const [detail, SetDetail] = useState({
    range: null,
    email: null,
    id: null,
    date: null,
    timerange: null,
    time: null,
    type: null,
    studentID: null,
  })
  // console.log(detail);
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        console.log(!ValidateEmail(user.email))
        if (!ValidateEmail(user.email)) {
          setSession({
            isLoggedIn: true,
            cerrentUser: user,
            errorMessage: null,
            role: "admin",
          })
          sessionStorage.setItem("session", true)
        } else {
          setSession({
            isLoggedIn: true,
            cerrentUser: user,
            errorMessage: null,
            role: "user",
          })

          // console.log(user)
          sessionStorage.setItem("session", true)

          db.database()
            .ref(`Data`)
            .on("value", (snap) => {
              let emailList = []
              let data = snap.val()
              for (let id in data) {
                emailList.push({ id, ...data[id] })
              }
              // console.log(emailList);
              setRawData(emailList)
              const findUser = emailList.filter((val) => {
                return val.email === user.email
              })
              const check = Object.keys(findUser).length !== 0
              if (check) {
                setCheck(check)
                sessionStorage.setItem("check", true)
              }
              // console.log(findUser);

              if (check) {
                SetDetail({
                  id: findUser[0].id,
                  range: findUser[0].range,
                  timerange: findUser[0].timerange,
                  time: findUser[0].time,
                  type: findUser[0].type,
                  studentID: findUser[0].studentID,
                  email: findUser[0].email,
                  date: findUser[0].date,
                })
              }
            })
        }
      }
    })
  }, [])

  return (
    <contextSession.Provider
      value={{
        setSession,
        session,
        SetDetail,
        detail,
        check,
        setCheck,
        rawData,
        getStudentId,
        setStudentId,
        getRange,
        setRange,
        getTimeRange,
        setTimeRange,
        getTime,
        setTime,
        getType,
        setType,
        selectedDate,
        setSelectedDate,
      }}
    >
      {session.isLoggedIn ? (
        <>
          {session.role === "user" && (
            <>
              {!sessionStorage.getItem("check") && <Redirect to="/Home" />}
              <Nav />
              <Route exact path="/Home" component={Home} />
              <Route path="/Queue" component={Queue} />
              <Route path="/Detail" component={Detail} />
              <Route path="/News" component={News} />
            </>
          )}
          {session.role === "admin" && (
            <>
              <Nav />
              <Route exact path="/admin" component={Admin} />
              <Redirect to="/admin" />
            </>
          )}
        </>
      ) : (
        <>
          {!sessionStorage.getItem("session") ? (
            <>
              {location.pathname === "/register" ? null : (
                <Redirect to="/login" />
              )}
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
            </>
          ) : (
            <h1 style={{ color: "blueviolet", textAlign: "center" }}>
              ...loading
            </h1>
          )}
        </>
      )}
    </contextSession.Provider>
  )
}
export { contextSession }
export default App
