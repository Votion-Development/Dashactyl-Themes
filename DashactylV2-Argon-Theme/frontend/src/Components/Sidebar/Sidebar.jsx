/*eslint-disable*/
import React from "react";
import { Link } from "react-router-dom";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import 'sweetalert2/dist/sweetalert2.min.css';
import logo from '../../Assets/img/brand/blue.png';

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
    <nav className="navbar navbar-vertical fixed-left navbar-expand-md navbar-light bg-white" id="sidenav-main">
    <div className="container-fluid">
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#sidenav-collapse-main" aria-controls="sidenav-main" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <a className="navbar-brand pt-0" href="/dashboard">
        <img src={logo} className="navbar-brand-img" alt="..."/>
      </a>
      <ul className="nav align-items-center d-md-none">
        <li className="nav-item dropdown">
          <a className="nav-link nav-link-icon" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <i className="ni ni-bell-55"></i>
          </a>
          <div className="dropdown-menu dropdown-menu-arrow dropdown-menu-right" aria-labelledby="navbar-default_dropdown_1">
            <a className="dropdown-item" href="#">Action</a>
            <a className="dropdown-item" href="#">Another action</a>
            <div className="dropdown-divider"></div>
            <a className="dropdown-item" href="#">Something else here</a>
          </div>
        </li>
        <li className="nav-item dropdown">
          <a className="nav-link" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <div className="media align-items-center">
              <span className="avatar avatar-sm rounded-circle">
                <img alt="Image placeholder" src="https://media.discordapp.net/attachments/977555806906101780/1003309628681109514/thumb-1920-1082090.jpg?width=841&height=473"/>
              </span>
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

      <div className="collapse navbar-collapse" id="sidenav-collapse-main">
        <div className="navbar-collapse-header d-md-none">
          <div className="row">
            <div className="col-6 collapse-brand">
              <a href="/dashboard">
                <img src={logo}/>
              </a>
            </div>
            <div className="col-6 collapse-close">
              <button type="button" className="navbar-toggler" data-toggle="collapse" data-target="#sidenav-collapse-main" aria-controls="sidenav-main" aria-expanded="false" aria-label="Toggle sidenav">
                <span></span>
                <span></span>
              </button>
            </div>
          </div>
        </div>

        <ul className="navbar-nav">
          <li className="nav-item  active ">
            <Link className="nav-link  active " to="/dashboard">
              <i className="ni ni-tv-2 text-primary"></i> Dashboard
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link " to="/dashboard/create">
              <i className="fas fa-plus text-green"></i> Deploy Server
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link " to="/dashboard/afk">
              <i className="ni ni-single-02 text-yellow"></i> AFK Portal
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link " to="/dashboard/store">
              <i className="fas fa-store text-blue"></i> Buy Resources
            </Link>
          </li>
          {isLoading ? <></> : pteroUser.attributes.root_admin ?
           <>
          <hr className="my-3"/>
          <li className="nav-item">
            <Link className="nav-link " to="/dashboard/admin">
              <i className="ni ni-bullet-list-67 text-red"></i> Admin Panel
            </Link>
          </li>
          </> : <></>
      }
        </ul>
      </div>
    </div>
  </nav>
    </>
  );
}
