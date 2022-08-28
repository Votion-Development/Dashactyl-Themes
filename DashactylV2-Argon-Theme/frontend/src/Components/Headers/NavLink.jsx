import React from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import 'sweetalert2/dist/sweetalert2.min.css';

const MySwal = withReactContent(Swal);

export default function NavLink() {
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
						setUser(json.user);
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

	return (
		<>
         <div className="row align-items-center py-4">
            <div className="col-lg-6 col-7">
                <h6 className="h2 text-white d-inline-block mb-0">Welcome {isLoading ? <span>Loading</span> : user.username }!</h6>
            </div>
            <div className="col-lg-6 col-5 text-right">
                <button type="button" onClick={openPanel} className="btn btn-sm btn-neutral">Panel</button>
                <button type="button" onClick={openDiscord} className="btn btn-sm btn-neutral">Discord</button>
            </div>
        </div>
		</>
	);
}