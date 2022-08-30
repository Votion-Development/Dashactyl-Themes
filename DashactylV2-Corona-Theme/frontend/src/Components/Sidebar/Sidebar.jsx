/*eslint-disable*/
import React from "react";
import { Link } from "react-router-dom";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import 'sweetalert2/dist/sweetalert2.min.css';
import logo from '../../Assets/images/logo.svg';
import logomini from '../../Assets/images/logo-mini.svg';

const MySwal = withReactContent(Swal)

export default function Sidebar() {
  const [collapseShow, setCollapseShow] = React.useState("hidden");
  const [isLoading, setIsLoading] = React.useState(true);
  const [name, setName] = React.useState(String)
  const [user, setUser] = React.useState(String)
  const [pteroUser, setPteroUser] = React.useState(String)
  const [isConnected, setIsConnected] = React.useState(false)

  React.useEffect(() => {
    const webSocketProtocol = window.location.protocol == "https:" ? "wss://" : "ws://";
    const ws = new W3CWebSocket(`${webSocketProtocol}${window.location.host}/api/watch`);

    ws.onopen = function (event) {
      if (isConnected === true) return ws.close()
      console.log("Connected to websocket");
      setIsConnected(true)
    };
    ws.onclose = function (event) {
      console.log("Disconnected from websocket (Close Event)");
      MySwal.fire({
        icon: 'error',
        title: 'Error',
        text: "Cannot contact the backend. Please contact a site administrator.",
        confirmButtonText: "Reload Page",
      }).then(() => {
        window.location.reload()
      })
    };
    ws.addEventListener('message', function (event) {
      if (event.data.toString("utf8") === "stay alive pretty please thanks") return
      const data = JSON.parse(event.data)
      if (data.error) MySwal.fire({
        icon: 'error',
        title: 'Error',
        text: data.error,
      })
      setUser(data.user)
    });
    return () => {
      console.log("Disconnected from websocket (Page Leave)");
      ws.close()
    };
  }, []);

  React.useEffect(() => {
    fetch('/api/getName', {
      credentials: 'include'
    })
      .then(response => response.json())
      .then(json => {
        setName(json.name)
        fetch('/api/me', {
          credentials: 'include'
        })
          .then(response => response.json())
          .then(json => {
            setUser(json.user)
            setPteroUser(json.ptero_user)
            setIsLoading(false)
          })
      })
  }, []);

  return (
    <>
      <nav className="sidebar sidebar-offcanvas" id="sidebar">
        <div className="sidebar-brand-wrapper d-none d-lg-flex align-items-center justify-content-center fixed-top">
          <a className="sidebar-brand brand-logo" href="/dashboard"><img src={logo} alt="logo" /></a>
          <a className="sidebar-brand brand-logo-mini" href="/dashboard"><img src={logomini} alt="logo" /></a>
        </div>
        <ul className="nav">
          <li className="nav-item nav-category">
          {isLoading ?
            <span className="nav-link">Loading</span>
          : <span className="nav-link">You have {user.coins} coins</span>
          }
          </li>
          <li className="nav-item menu-items">
            <Link className="nav-link" to="/dashboard">
              <span className="menu-icon">
                <i className="mdi mdi-bank"></i>
              </span>
              <span className="menu-title">Home</span>
            </Link>
          </li>
          <li className="nav-item menu-items">
            <Link className="nav-link" to="/dashboard/create">
              <span className="menu-icon">
                <i className="mdi mdi-laptop"></i>
              </span>
              <span className="menu-title">Deploy Server</span>
            </Link>
          </li>
          <li className="nav-item nav-category">
            <span className="nav-link">More Resources</span>
          </li>
          <li className="nav-item menu-items">
            <Link className="nav-link" to="/dashboard/afk">
              <span className="menu-icon">
                <i className="mdi mdi-cast-connected"></i>
              </span>
              <span className="menu-title">AFK Portal</span>
            </Link>
          </li>
          <li className="nav-item menu-items">
            <Link className="nav-link" to="/dashboard/store">
              <span className="menu-icon">
                <i className="mdi mdi-credit-card"></i>
              </span>
              <span className="menu-title">Buy Extra Resources</span>
            </Link>
          </li>
          {isLoading ? <></> : pteroUser.attributes.root_admin ?
           <>
           <li className="nav-item nav-category">
            <span className="nav-link">Administrator Settings</span>
          </li>
           <li className="nav-item menu-items">
                  <Link className="nav-link" to="/dashboard/admin">
                    <span className="menu-icon">
                      <i className="mdi mdi-dice-6"></i>
                    </span>
                    <span className="menu-title">Dashboard</span>
                  </Link>
                </li>
                </> : <></>
      }
        </ul>
      </nav>
    </>
  );
}
