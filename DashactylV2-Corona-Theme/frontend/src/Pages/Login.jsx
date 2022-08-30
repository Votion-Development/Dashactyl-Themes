import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import discordImg from '../Assets/Img/discord.svg';
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
                <h3 className="card-title text-center mb-3">Dashactyl Login</h3>
                <hr/>
                <form onSubmit={formlogin}>
                  <div className="form-group">
                    <label>Email</label>
                    <input type="email" id="email" required="required" className="form-control p_input text-white"/>
                  </div>
                  <div className="form-group">
                    <label>Password</label>
                    <input type="password" id="password" required="required" className="form-control p_input text-white"/>
                  </div>
                  <div className="form-group d-flex align-items-center justify-content-between">
                    <a href="#pablo" onClick={(e) => e.preventDefault()} className="forgot-pass">Forgot password</a>
                  </div>
                  <div className="text-center">
                    <button type="submit" className="btn btn-primary btn-block enter-btn">Login</button>
                  </div>
                  <div className="d-flex">
                    <button onClick={redirectDiscord} className="btn btn-facebook me-2 col">
                      <i className="mdi mdi-discord"></i> Discord </button>
                  </div>
                  <p className="sign-up">Don't have an Account?<Link to="/auth/register"> Register</Link></p>
                </form>
		</>
	);
}
