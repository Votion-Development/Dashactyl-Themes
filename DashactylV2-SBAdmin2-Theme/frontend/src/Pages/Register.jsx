import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import discordImg from '../Assets/Img/discord.svg';
import Alert from '../Components/Alert';
import register from '../Api/Register';

export default function Register() {
	const [message, setMessage] = useState('');
	const navigate = useNavigate();

	const formregister = (event) => {
		register(event).then(data => {
			if (data.success) return navigate('/dashboard');
			if (data.error) setMessage(data.error);
		});
	};

	const redirectDiscord = () => {
		window.location.href = '/auth/discord'
	}

	return (
		<>
		  <div className="row">
                            <div className="col-lg-6 d-none d-lg-block bg-login-image"></div>
                            <div className="col-lg-6">
                                <div className="p-5">
                                    <div className="text-center">
                                        <h1 className="h4 text-gray-900 mb-4">Dashactyl Register</h1>
                                    </div>
                                    <form className="user" onSubmit={formregister}>
									<div className="form-group">
                                            <input id="usernme" type="text" className="form-control form-control-user"
                                                placeholder="Username" required/>
                                        </div>
                                        <div className="form-group">
                                            <input id="email" type="email" className="form-control form-control-user"
                                                placeholder="Enter Email Address..." required/>
                                        </div>
                                        <div className="form-group">
                                            <input className="form-control form-control-user"
                                                id="password" placeholder="Password" type="password" required/>
                                        </div>
                                        <button type="submit" className="btn btn-primary btn-user btn-block">
                                            Register
                                        </button>
                                        <hr/>
                                        <button onClick={redirectDiscord} type="button" className="btn btn-facebook btn-user btn-block">
                                            Login with Discord
                                        </button>
                                    </form>
                                    <hr/>
                                    <div className="text-center">
                                        <a className="small" href="#pablo" onClick={(e) => e.preventDefault()}>Forgot Password?</a>
                                    </div>
                                    <div className="text-center">
									<Link to="/auth/login" className="small">Existing User?</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
		</>
	);
}
