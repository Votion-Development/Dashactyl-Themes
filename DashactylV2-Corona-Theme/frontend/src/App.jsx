import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import AuthRouter from './Routers/AuthRouter';
import DashboardRouter from './Routers/DashboardRouter';
import NProgress from 'nprogress';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'nprogress/nprogress.css';
import './Assets/css/nprogress.css';
import './Assets/vendors/mdi/css/materialdesignicons.min.css';
import './Assets/vendors/css/vendor.bundle.base.css';
import './Assets/css/style.css';

import '../node_modules/bootstrap/dist/js/bootstrap.min.js';
import './Assets/js/settings.js';
import './Assets/js/off-canvas.js';
import './Assets/js/hoverable-collapse.js';
import './Assets/js/misc.js';
import './Assets/js/dashboard.js';

function App() {
	React.useEffect(() => {
		fetch('/api/afk', {
			credentials: 'include'
		})
			.then(response => response.json())
			.then(json => {
				const script = document.createElement('script');

				script.src = `https://arc.io/widget.min.js#${json.arcio_code}`;
				script.async = true;

				document.body.appendChild(script);
			});
	}), [];

	const location = useLocation();

	React.useEffect(() => {
		NProgress.start();
		NProgress.done();
	}, [location.pathname]);

	return (
		<>
			<ToastContainer
				position="top-right"
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick={false}
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
			/>
			<Routes>
				<Route path="/" element={<div>Loading</div>} />
				<Route path="/auth/*" element={<AuthRouter />} />
				<Route path="/dashboard/*" element={<DashboardRouter />} />
			</Routes>
		</>
	);
}

export default App;
