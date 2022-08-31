import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import Alert from '../Components/Alert';
import login from '../Api/Login';

import { toast } from 'react-toastify'

export default function Login() {
	const [message, setMessage] = useState('');
	const navigate = useNavigate();

	const formlogin = (event) => {
		login(event).then(data => {
			if (data.success) return navigate('/dashboard');
			if (data.error) {
				setMessage(data.error)
				toast.error(data.error, {
					position: "top-right",
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: false,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
				});
			}
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
                                        <h1 className="h4 text-gray-900 mb-4">Dashactyl Login</h1>
                                    </div>
                                    <form className="user" onSubmit={formlogin}>
                                        <div className="form-group">
                                            <input id="email" type="email" className="form-control form-control-user"
                                                placeholder="Enter Email Address..." required/>
                                        </div>
                                        <div className="form-group">
                                            <input className="form-control form-control-user"
                                                id="password" placeholder="Password" type="password" required/>
                                        </div>
                                        <button type="submit" className="btn btn-primary btn-user btn-block">
                                            Login
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
									<Link to="/auth/register" className="small">Create an Account!</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
		</>
	);
}
