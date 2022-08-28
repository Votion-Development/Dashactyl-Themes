import React from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import Login from '../Pages/Login';
import Register from '../Pages/Register';
import logo from '../Assets/img/brand/white.png';

export default () => (
 <div className="bg-default">
	<div className="main-content">
	  <nav className="navbar navbar-top navbar-horizontal navbar-expand-md navbar-dark">
		<div className="container px-4">
		  <a className="navbar-brand" href="/dashboard">
			<img src={logo} />
		  </a>
		</div>
	  </nav>
	  <div className="header bg-gradient-primary py-7 py-lg-8">
		<div className="separator separator-bottom separator-skew zindex-100">
		  <svg x="0" y="0" viewBox="0 0 2560 100" preserveAspectRatio="none" version="1.1" xmlns="http://www.w3.org/2000/svg">
			<polygon className="fill-default" points="2560 0 2560 100 0 100"></polygon>
		  </svg>
		</div>
	  </div>
	  <div className="container mt--8 pb-5">
		<div className="row justify-content-center">
		  <div className="col-lg-5 col-md-7">
			<Routes>
				<Route path={'/login'} element={<Login />} />
				<Route path={'/register'} element={<Register />} />
			</Routes>
		  </div>
		</div>
	  </div>
	</div>
	  <footer className="py-5">
		<div className="container">
		  <div className="row align-items-center justify-content-xl-between">
			<div className="col-xl-6">
			  <div className="copyright text-center text-xl-left text-muted">
				© 2022 <a href="https://www.creative-tim.com" className="font-weight-bold ml-1" target="_blank" rel="noreferrer">Creative Tim</a>
			  </div>
			</div>
			<div className="col-xl-6">
			  <ul className="nav nav-footer justify-content-center justify-content-xl-end">
				<li className="nav-item">
				  <a href="https://www.creative-tim.com" className="nav-link" target="_blank" rel="noreferrer">Creative Tim</a>
				</li>
				<li className="nav-item">
				  <a href="https://www.creative-tim.com/presentation" className="nav-link" target="_blank" rel="noreferrer">About Us</a>
				</li>
				<li className="nav-item">
				  <a href="http://blog.creative-tim.com" className="nav-link" target="_blank" rel="noreferrer">Blog</a>
				</li>
				<li className="nav-item">
				  <a href="https://github.com/creativetimofficial/argon-dashboard/blob/master/LICENSE.md" className="nav-link" target="_blank" rel="noreferrer">MIT License</a>
				</li>
			  </ul>
			</div>
		  </div>
		</div>
	  </footer>
	</div>
);