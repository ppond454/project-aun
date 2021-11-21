import "./App.css"
import React, { useEffect, useState, createContext } from "react"
import Login from "./pages/Login"

import "./App.css"
import Queue from "./pages/Queue"
import { Route, Redirect } from "react-router-dom"
import Home from "./pages/Home"
import { auth, db } from "./config/firebase"
import Detail from "./pages/Detail"
import News from "./pages/News"
import Nav from "./component/Nav"

const contextSession = createContext() // ศึกษาเรื่อง  useContext

function App() {
  //const refreshPage = () => window.location.reload(false);
  const [session, setSession] = useState({
    isLoggedIn: false,
    cerrentUser: null,
    errorMessage: null,
    check: false,
  })

  const [check, setCheck] = useState(false)
  const [rawData, setRawData] = useState(null)


  const [detail, SetDetail] = useState({
    range: 0,
    email: null,
    id: null,
    timerange: null,
    time: null,
    type: null,
    studentID: null,
  })

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      // เช็คสถานะ login
      if (user) {
        setSession({
          isLoggedIn: true,
          cerrentUser: user,
          errorMessage: null,
        })
        sessionStorage.setItem("session",true)
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
  
            const check = Object.keys(findUser).length !== 0 // เช็คว่าเคยลงทะเบียนหรือยัง?
            setCheck(check)
            if (check) {
              SetDetail({
                id: findUser[0].id,
                range: findUser[0].range,
                timerange: findUser[0].timerange,
                time: findUser[0].time,
                type: findUser[0].type,
                studentID: findUser[0].studentID,
                email: findUser[0].email,
              })
            }
          })
      }
    })
  }, [])

  return (
    <contextSession.Provider
      value={{ setSession, session, SetDetail, detail, check ,rawData }}
    >
      {/* เช็ค Login */}
      {session.isLoggedIn ? (
        <>
          {check ? <Redirect to="/Detail" /> : <Redirect to="/"/>}
          <Nav />
          <Route exact path={["/Home", "/"]} component={Home} />
          <Route path="/Queue" component={Queue} />
          <Route path="/Detail" component={Detail} />
          <Route path="/News" component={News} />
        </>
      ) : (
        <>
          <Redirect to="/login" />
          {!sessionStorage.getItem("session") ? (
            <>
              <Route path="/login" component={Login} />
            </>
          ) : (
            // โหลดตอน refresh หน้าเว็บ
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