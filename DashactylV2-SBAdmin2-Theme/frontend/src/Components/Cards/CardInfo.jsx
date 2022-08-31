import React from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import 'sweetalert2/dist/sweetalert2.min.css';

const MySwal = withReactContent(Swal);

export default function CardAccountInfo() {
	const [isLoading, setIsLoading] = React.useState(true);
	const [discordInvite, setDiscordInvite] = React.useState(String);
	const [pterodactylURL, setPterodactylURL] = React.useState(String);
	const [user, setUser] = React.useState(String);

	React.useEffect(() => {
		fetch('/api/dashboard-info', {
			credentials: 'include'
		})
			.then(response => response.json())
			.then(json => {
				setDiscordInvite(json.discord_invite);
				setPterodactylURL(json.pterodactyl_url);
				fetch('/api/me', {
					credentials: 'include'
				})
					.then(response => response.json())
					.then(json => {
						setUser(json.ptero_user);
						setIsLoading(false);
					});
			});
	}, []);

	const openPanel = () => {
		window.open(pterodactylURL);
	}

	const openDiscord = () => {
		window.open(discordInvite);
	}

	const resetPassword = () => {
		fetch('/api/reset-password', {
			method: 'post',
			credentials: 'include'
		})
			.then(response => response.json())
			.then(json => {
				MySwal.fire({
					icon: 'info',
					title: 'New Password',
					text: `Your new password to login to the Panel and Client Area is: ${json.password}. Please write this down and keep it in a safe place.`,
				})
			});
	}

	return (
		<>
		  <div className="col-xl-4 col-lg-5">
                            <div className="card shadow mb-4">
                                <div
                                    className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                                    <h6 className="m-0 font-weight-bold text-primary">Login Information</h6>
                                    
                                </div>
                                <div className="card-body">
                                    <input type="text" className="form-control form-control-user"
                                            placeholder={isLoading ? <>Loading</>
											: user.attributes.email } disabled/>
                                            <hr/>
											{isLoading ? <button type="button" onClick={resetPassword} className="btn btn-primary btn-user btn-block" disabled>
                                                Reset Password
                                            </button>
					  : <button type="button" onClick={resetPassword} className="btn btn-primary btn-user btn-block">
					  Reset Password
				  </button> }
					  {isLoading ? <button type="button" onClick={openPanel} className="btn btn-primary btn-user btn-block" disabled>
                                                Game Panel
                                            </button>
					  : <button type="button" onClick={openPanel} className="btn btn-primary btn-user btn-block">
					  Game Panel
				  </button> }
					  {isLoading ? <button type="button" onClick={openDiscord} className="btn btn-primary btn-user btn-block" disabled>
                                                Discord Server
                                            </button>
					  :<button type="button" onClick={openDiscord} className="btn btn-primary btn-user btn-block">
					  Discord Server
				  </button> }
                                </div>
                            </div>
                        </div>
		</>
	);
}
