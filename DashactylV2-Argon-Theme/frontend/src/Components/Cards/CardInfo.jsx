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
		<div className="col-xl-4">
            <div className="card">
                <div className="card-header border-0">
                    <div className="row align-items-center">
                        <div className="col">
                            <h3 className="mb-0">Information</h3>
                        </div>
                        <div className="col text-right">
                            <button type="button" onClick={resetPassword} className="btn btn-sm btn-primary">Reset Password</button>
                        </div>
                    </div>
                    <div className="table-responsive">
                        <div
                            className="d-flex d-md-block d-xl-flex flex-row py-3 px-4 px-md-3 px-xl-4 rounded mt-3">
                            <div className="text-md-center text-xl-left">
                                <h5>Email:</h5>
                                <input type="text" className="form-control form-control-muted gap-4"
                                    placeholder={isLoading ? <span>Loading</span>
									: user.attributes.email } disabled/>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
		</>
	);
}
