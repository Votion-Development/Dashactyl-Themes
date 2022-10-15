import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Sidebar from '../Components/Sidebar/Sidebar';
import HeaderStats from '../Components/Headers/HeaderStats';
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
	<div id="wrapper">
        <Sidebar />
        <div id="content-wrapper" className="d-flex flex-column">
            <div id="content">
               <Navbar />
                <div className="container-fluid">
                    <div className="row">
                        <HeaderStats />
                    </div>
				<Routes>
					<Route path={'/'} element={<Dashboard />} />
					<Route path={'/afk'} element={<Afk />} />
					<Route path={'/create'} element={<CreateServer />} />
					<Route path={'/manage/:id'} element={<ManageServer />} />
					<Route path={'/store'} element={<Store />} />
					<Route path={'/admin'} element={<Admin />} />
					<Route path={'/admin/key/:key'} element={<ManageKey />} />
				</Routes>
</div>
            </div>
<FooterAdmin />
        </div>
    </div>
	</>
);