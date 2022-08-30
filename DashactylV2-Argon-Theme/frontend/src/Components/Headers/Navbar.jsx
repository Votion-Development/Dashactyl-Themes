/*eslint-disable*/
import React from "react";
import { Link } from "react-router-dom";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import 'sweetalert2/dist/sweetalert2.min.css';

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
     <nav className="navbar navbar-top navbar-expand-md navbar-dark" id="navbar-main">
      <div className="container-fluid">
        <button type="button" className="btn btn-default">
          <span>Your coins</span>
          <span className="badge badge-primary text-white">{ isLoading ?
                    <>Loading</>
                    : <>{user.coins}</> }</span>
       </button>

   
        <ul className="navbar-nav align-items-center d-none d-md-flex">
          <li className="nav-item dropdown">
            <a className="nav-link pr-0" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <div className="media align-items-center">
                <span className="avatar avatar-sm rounded-circle">
                  <img alt="Image placeholder" src="https://media.discordapp.net/attachments/977555806906101780/1003309628681109514/thumb-1920-1082090.jpg?width=841&height=473"/>
                </span>
                <div className="media-body ml-2 d-none d-lg-block">
                 { isLoading ?
                    <span className="mb-0 text-sm  font-weight-bold">Loading</span>
                    : <span className="mb-0 text-sm  font-weight-bold">{user.username}</span> }
                </div>
              </div>
            </a>
            <div className="dropdown-menu dropdown-menu-arrow dropdown-menu-right">
              <div className=" dropdown-header noti-title">
                <h6 className="text-overflow m-0">Welcome!</h6>
              </div>
              <div className="dropdown-divider"></div>
              <a href="/auth/logout" className="dropdown-item">
                <i className="ni ni-user-run"></i>
                <span>Logout</span>
              </a>
            </div>
          </li>
        </ul>
      </div>
    </nav>
    </>
  );
}