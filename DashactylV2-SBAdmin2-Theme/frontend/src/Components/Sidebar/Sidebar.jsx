/*eslint-disable*/
import React from "react";
import { Link } from "react-router-dom";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import 'sweetalert2/dist/sweetalert2.min.css';

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
     <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
            <a className="sidebar-brand d-flex align-items-center justify-content-center" href="index.html">
                <div className="sidebar-brand-text mx-3">Dashactyl</div>
            </a>
            <hr className="sidebar-divider my-0"/>

         
            <li className="nav-item">
                <a className="nav-link" href="#pablo" onClick={(e) => e.preventDefault()}>
                    <i className="fas fa-fw fa-chart-area"></i>
                    { isLoading ?
                    <> <span>Loading</span> </>
                    : <><span> You have {user.coins} coins.</span> </> }
                   </a>
            </li>

            <hr className="sidebar-divider"/>

            <li className="nav-item">
                <Link className="nav-link" to="/dashboard">
                    <i className="fas fa-fw fa-tachometer-alt"></i>
                    <span>Dashboard</span></Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/dashboard/create">
                    <i className="fas fa-fw fa-folder"></i>
                    <span>Deploy Server</span></Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/dashboard/afk">
                    <i className="fas fa-fw fa-table"></i>
                    <span>AFK Portal</span></Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/dashboard/store">
                    <i className="fas fa-fw fa-wrench"></i>
                    <span>Resources Shop</span></Link>
            </li>
            {isLoading ? <></> : pteroUser.attributes.root_admin ?
           <>
            <hr className="sidebar-divider"/>
            <li className="nav-item">
                <Link className="nav-link" to="/dashboard/admin">
                    <i className="fas fa-fw fa-cog"></i>
                    <span>Admin Panel</span></Link>
            </li>
            <hr className="sidebar-divider"/>
            </> : <></>
      }
        </ul>
    </>
  );
}
