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
			  <h3 className="card-title text-center mb-3">Dashactyl Register</h3>
          <hr/>
        <form onSubmit={formregister}>
				<div className="form-group">
                    <label>Username</label>
                    <input type="text" id="username" required="required" className="form-control p_input text-white"/>
                  </div>
                  <div className="form-group">
                    <label>Email</label>
                    <input type="email" id="email" required="required" className="form-control p_input text-white"/>
                  </div>
                  <div className="form-group">
                    <label>Password</label>
                    <input type="password" id="password" required="required" className="form-control p_input text-white"/>
                  </div>
                  <div className="text-center">
                    <button type="submit" className="btn btn-primary btn-block enter-btn">Create Account</button>
                  </div>
                  <div className="d-flex">
                    <button onClick={redirectDiscord} className="btn btn-facebook me-2 col">
                      <i className="mdi mdi-discord"></i> Discord </button>
                  </div>
                  <p className="sign-up">Don't have an Account?<Link to="/auth/login"> Register</Link></p>
                </form>
		</>
	);
}
