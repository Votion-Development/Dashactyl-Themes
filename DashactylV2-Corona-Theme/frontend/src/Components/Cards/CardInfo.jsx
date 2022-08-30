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
              <div className="col-md-4 grid-margin stretch-card">
                <div className="card">
                  <div className="card-body">
                    <h4 className="card-title text-center">Account Information</h4>
					<hr/>
                    <div className="bg-gray-dark d-flex d-md-block d-xl-flex flex-row py-3 px-4 px-md-3 px-xl-4 rounded mt-3">
                      <div className="text-md-center text-xl-left">
					  <div className="alert alert-primary" role="alert">
					  <h6 className="mb-1">Panel Email</h6>
					  {isLoading ? <p className="text-muted mb-0">Loading</p>
					  : user.attributes.email }
                      </div>
					  <div className="d-grid gap-2">
					  {isLoading ? <button type="button" className="btn btn-primary btn-lg btn-block" disabled> Go to Panel </button>
					  : <button type="button" onClick={openPanel} className="btn btn-primary btn-lg btn-block"> Go to Panel </button> }
					  {isLoading ? <button type="button" className="btn btn-primary btn-lg btn-block" disabled> Reset Password </button>
					  : <button type="button" onClick={resetPassword} className="btn btn-primary btn-lg btn-block"> Reset Password </button> }
					  {isLoading ? <button type="button" className="btn btn-primary btn-lg btn-block" disabled> Join our Discord Server </button>
					  : <button type="button" onClick={openDiscord} className="btn btn-primary btn-lg btn-block"> Join our Discord Server </button> }
                    </div>
					</div>
                    </div>
                  </div>
                </div>
              </div>
			  </>
	);
}
