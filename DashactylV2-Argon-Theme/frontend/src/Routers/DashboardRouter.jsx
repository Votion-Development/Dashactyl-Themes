import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Sidebar from '../Components/Sidebar/Sidebar';
import HeaderStats from '../Components/Headers/HeaderStats';
import NavLink from '../Components/Headers/NavLink';
import Navbar from '../Components/Headers/Navbar';
import FooterAdmin from '../Components/Footers/FooterAdmin';

// views

import Dashboard from '../Pages/Dashboard';
import Afk from '../Pages/Afk';
import CreateServer from '../Pages/CreateServer';
import ManageServer from '../Pages/ManageServer';
import Store from '../Pages/Store';
import Admin from '../Pages/Admin';
import ManageKey from '../Pages/ManageKey';

export default () => (
	<>
  <Sidebar />
  <div className="main-content">
  <Navbar />
    <div className="header bg-gradient-primary pb-8 pt-5 pt-md-8">
      <div className="container-fluid">
        <div className="header-body">
         <NavLink />
          <div className="row">
           <HeaderStats />
          </div>
        </div>
      </div>
    </div>
    <div className="container-fluid mt--6">
    <Routes>
					<Route path={'/'} element={<Dashboard />} />
					<Route path={'/afk'} element={<Afk />} />
					<Route path={'/create'} element={<CreateServer />} />
					<Route path={'/manage/:id'} element={<ManageServer />} />
					<Route path={'/store'} element={<Store />} />
					<Route path={'/admin'} element={<Admin />} />
					<Route path={'/admin/key/:key'} element={<ManageKey />} />
				</Routes>
	<FooterAdmin />
    </div>
  </div>
	</>
);