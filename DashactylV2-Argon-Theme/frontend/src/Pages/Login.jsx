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
		<div className="card bg-secondary shadow border-0">
		<div className="card-body px-lg-5 py-lg-5">
              <div className="text-center text-muted mb-4">
                <small>Sign in with credentials</small>
              </div>
              <form onSubmit={formlogin}>
                <div className="form-group mb-3">
                  <div className="input-group input-group-alternative">
                    <div className="input-group-prepend">
                      <span className="input-group-text"><i className="ni ni-email-83"></i></span>
                    </div>
                    <input id="email" type="email" className="form-control" placeholder="Email" required/>
                  </div>
                </div>
                <div className="form-group">
                  <div className="input-group input-group-alternative">
                    <div className="input-group-prepend">
                      <span className="input-group-text"><i className="ni ni-lock-circle-open"></i></span>
                    </div>
                    <input className="form-control" id="password" placeholder="Password" type="password" required/>
                  </div>
                </div>
                <div className="text-center">
                  <button type="submit" className="btn btn-primary my-4">Sign in</button>
                  <button onClick={redirectDiscord} type="button" className="btn btn-primary my-4">Login With Discord</button>
                </div>
              </form>
			  </div>
			  </div>
			  <div className="row mt-3">
			  <div className="col-6">
				<a href="#pablo" onClick={(e) => e.preventDefault()} className="text-light"><small>Forgot password?</small></a>
			  </div>
			  <div className="col-6 text-right">
			  <Link to="/auth/register" className="text-light"><small>Create new account</small></Link>
			  </div>
			</div>
		</>
	);
}
