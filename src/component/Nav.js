import React, { useContext } from "react"
import "./Nav.css"
import { NavLink } from "react-router-dom"
import { auth } from "../config/firebase"
import { useHistory } from "react-router-dom"
import { contextSession } from "../App"

export default function Nav() {
  const { setSession, SetDetail, setCheck ,setRange ,setTime ,setType   } = useContext(contextSession)
  const history = useHistory()
  const handleLogOut = (e) => {
    e.preventDefault()
    auth.signOut().then(() => {
      setSession({
        isLoggedIn: false,
        currentUser: null,
      })
      SetDetail({
        range: null,
        email: null,
        id: null,
        timerange: null,
        time: null,
        type: null,
        studentID: null,
      })
        setCheck(false)
        setRange(null)
        setTime(null)
        setType(null)
    })
     sessionStorage.clear()
    localStorage.clear()
    history.push("/login")
  }

  return (
    <div>
      

      <nav class="navbar navbar-expand-sm bg-dark navbar-dark">
        <div class="container-fluid">
          <ul className="navbar-nav">
            <li className="nav-item">
             <a class="nav-link active" href="/Home">Home</a> 
            </li>
            <li className="nav-item">
            <a class="nav-link active" href="/Queue">Queue</a> 
            </li>
            <li className="nav-item">
            <a class="nav-link active" href="/Detail">Detail</a> 
            </li>

            <li className="nav-item">
            <a class="nav-link active" href="/News">News</a> 
            </li>
          </ul>

          {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
          <button  onClick={handleLogOut}>
            Logout
          </button>
        </div>
      </nav>
     
    </div>
  )
}