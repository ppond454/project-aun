import React, { useContext } from "react"
import "./Nav.css"
import { NavLink } from "react-router-dom"
import { auth } from "../config/firebase"
import { useHistory } from "react-router-dom"

import { contextSession } from "../App"

export default function Nav() {

  const { setSession, SetDetail , setCheck } = useContext(contextSession)

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
    })
   
    sessionStorage.clear()
    localStorage.clear()
    history.push("/login")
  }

  return (
    <div>
      <div className="topbox">
        <img src="estudent.jpg" width="120px"></img>
      </div>

      <nav>
        <div>
          <ul className="ul-nav">
            <li className="li-nav">
              <NavLink
                to="/Home" 
                activeStyle={{
                  fontWeight: "bold",
                  color: "blue",
                }}
              >
                Home
              </NavLink>
            </li>
            <li className="li-nav">
              <NavLink
                to="/Queue"
                activeStyle={{
                  fontWeight: "bold",
                  color: "blue",
                }}
              >
                Queue
              </NavLink>
            </li>
            <li className="li-nav">
              <NavLink
                to="/Detail"
                activeStyle={{
                  fontWeight: "bold",
                  color: "blue",
                }}
              >
                Detail
              </NavLink>
            </li>

            <li className="li-nav">
              <NavLink
                to="/News"
                activeStyle={{
                  fontWeight: "bold",
                  color: "blue",
                }}
              >
                News
              </NavLink>
            </li>
          </ul>

          {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
          <button className="btLogout" onClick={handleLogOut}>
            Logout
          </button>
        </div>
      </nav>
    </div>
  )
}
