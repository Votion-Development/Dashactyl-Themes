/*eslint-disable*/
import React from "react";
import { Link } from "react-router-dom";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import 'sweetalert2/dist/sweetalert2.min.css';
import logomini from '../../Assets/images/logo-mini.svg';

const MySwal = withReactContent(Swal)

export default function Navbar() {
  const [isLoading, setIsLoading] = React.useState(true);
  const [user, setUser] = React.useState(String)
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
    fetch('/api/me', {
      credentials: 'include'
    })
      .then(response => response.json())
      .then(json => {
        setUser(json.user)
        setIsLoading(false)
      })
  }, []);

  return (
    <>
      <nav className="navbar p-0 fixed-top d-flex flex-row">
          <div className="navbar-brand-wrapper d-flex d-lg-none align-items-center justify-content-center">
            <a className="navbar-brand brand-logo-mini" href="/dashboard"><img src={logomini} alt="logo" /></a>
          </div>
          <div className="navbar-menu-wrapper flex-grow d-flex align-items-stretch">
            <button className="navbar-toggler navbar-toggler align-self-center" type="button" data-toggle="minimize">
              <span className="mdi mdi-menu"></span>
            </button>
            <ul className="navbar-nav navbar-nav-right">
             
              
              <li className="nav-item dropdown border-left">
                <a className="nav-link count-indicator dropdown-toggle" id="notificationDropdown" href="#" data-bs-toggle="dropdown">
                  <i className="mdi mdi-bell"></i>
                  <span className="count bg-danger"></span>
                </a>
                <div className="dropdown-menu dropdown-menu-right navbar-dropdown preview-list" aria-labelledby="notificationDropdown">
                  <h6 className="p-3 mb-0">Notifications</h6>
                  <div className="dropdown-divider"></div>
                  
                  <div className="dropdown-divider"></div>
                  <p className="p-3 mb-0 text-center">See all notifications</p>
                </div>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link" id="profileDropdown" href="#" data-bs-toggle="dropdown">
                  <div className="navbar-profile">
                    <img className="img-xs rounded-circle" src="https://media.discordapp.net/attachments/977555806906101780/1003309628681109514/thumb-1920-1082090.jpg?width=841&height=473" alt=""/>
                    { isLoading ?
                    <p className="mb-0 d-none d-sm-block navbar-profile-name">Loading</p>
                    : <p className="mb-0 d-none d-sm-block navbar-profile-name">{user.username}</p> }
                    <i className="mdi mdi-menu-down d-none d-sm-block"></i>
                  </div>
                </a>
                <div className="dropdown-menu dropdown-menu-right navbar-dropdown preview-list" aria-labelledby="profileDropdown">
                  <h6 className="p-3 mb-0">Profile</h6>
                  <div className="dropdown-divider"></div>
                  <div className="dropdown-divider"></div>
                  <Link to="/auth/logout" className="dropdown-item preview-item">
                    <div className="preview-thumbnail">
                      <div className="preview-icon bg-dark rounded-circle">
                        <i className="mdi mdi-logout text-danger"></i>
                      </div>
                    </div>
                    <div className="preview-item-content">
                      <p className="preview-subject mb-1" href="/accounts/logout">Log out</p>
                    </div>
                  </Link>
                  <div className="dropdown-divider"></div>
                </div>
              </li>
            </ul>
            <button className="navbar-toggler navbar-toggler-right d-lg-none align-self-center" type="button" data-toggle="offcanvas">
              <span className="mdi mdi-format-line-spacing"></span>
            </button>
          </div>
        </nav>
    </>
  );
}
