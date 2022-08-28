import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Sidebar from '../Components/Sidebar/Sidebar';
import HeaderStats from '../Components/Headers/HeaderStats';
import FooterAdmin from '../Components/Footers/FooterAdmin';
import Banner from '../Components/Headers/Banner';
import Navbar from '../Components/Headers/Navbar';
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
	<div className="container-scroller">
	<Sidebar />
      <div className="container-fluid page-body-wrapper">
        <Navbar />
        <div className="main-panel">
          <div className="content-wrapper">
            <Banner />
            <HeaderStats />
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
    </div>
	</div>
	</>
);