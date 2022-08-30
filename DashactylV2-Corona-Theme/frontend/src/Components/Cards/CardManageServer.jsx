import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import 'sweetalert2/dist/sweetalert2.min.css';

const MySwal = withReactContent(Swal);

import { toast } from 'react-toastify'

export default function CardManageServer() {
	const [isLoading, setIsLoading] = React.useState(true);
	const [server, setServer] = React.useState(String);
	const [pterodactylUrl, setPterodactylUrl] = React.useState(String);
	const [renewal, setRenewal] = React.useState(String);
	const [renewalCost, setRenewalCost] = React.useState(String);
	const [renewalEnabled, setRenewalEnabled] = React.useState(String);

	const params = useParams();
	const navigate = useNavigate();

	React.useEffect(() => {
		fetch(`/api/server/get/${params.id}`, {
			credentials: 'include'
		})
			.then(response => response.json())
			.then(json => {
				if (json.error) return MySwal.fire({
					icon: 'error',
					title: 'Error',
					text: json.error,
				}).then(() => {
					navigate('/dashboard');
				});
				setServer(json.server);
				fetch('/api/dashboard-info', {
					credentials: 'include'
				})
					.then(response => response.json())
					.then(json => {
						if (json.error) return MySwal.fire({
							icon: 'error',
							title: 'Error',
							text: json.error,
						});
						setPterodactylUrl(json.pterodactyl_url);
						fetch(`/api/renew/get/${params.id}`, {
							credentials: 'include'
						})
							.then(response => response.json())
							.then(json => {
								if (json.error) return MySwal.fire({
									icon: 'error',
									title: 'Error',
									text: json.error,
								});
								const timestamp = new Date(json.renewal.renew_by);
								const date = new Intl.DateTimeFormat('en-UK', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(timestamp);
								setRenewal(date);
								setRenewalCost(json.renewal.renew_cost);
								setRenewalEnabled(json.renewal.renewal_enabled);
								setIsLoading(false);
							});
					});
			});
	}, []);

	const redirect = () => {
		window.open(`${pterodactylUrl}/server/${server.attributes.identifier}`);
	};

	const renewServer = () => {
		MySwal.fire({
			title: 'Are you sure you want to do this?',
			text: `This will cost you ${renewalCost} coins.`,
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Yes'
		}).then((result) => {
			if (result.isConfirmed) {
				fetch(`/api/renew/${params.id}`, {
					method: 'post',
					credentials: 'include'
				})
					.then(response => response.json())
					.then(json => {
						if (json.error) return MySwal.fire({
							icon: 'error',
							title: 'Error',
							text: json.error,
						});
						if (json.success) {
							fetch(`/api/renew/get/${params.id}`, {
								credentials: 'include'
							})
								.then(response => response.json())
								.then(json => {
									if (json.error) return MySwal.fire({
										icon: 'error',
										title: 'Error',
										text: json.error,
									});
									const timestamp = new Date(json.renewal.renew_by);
									const date = new Intl.DateTimeFormat('en-UK', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(timestamp);
									setRenewal(date);
									setRenewalCost(json.renewal.renew_cost);
									setRenewalEnabled(json.renewal.renewal_enabled);
								});
							return MySwal.fire({
								icon: 'success',
								title: 'Success!',
								text: 'The server has been renewed!',
							});
						}
					});
			}
		});
	};

	const deleteServer = () => {
		MySwal.fire({
			title: 'Are you sure you want to do this?',
			text: `You will not be able to undo this action!`,
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Yes'
		}).then((result) => {
			if (result.isConfirmed) {
				const deleteServerPromise = new Promise(async (resolve, reject) => {
					fetch(`/api/server/delete/${params.id}`, {
						method: 'delete',
						credentials: 'include'
					})
						.then(response => response.json())
						.then(json => {
							if (json.error) {
								reject(json.error)
								return MySwal.fire({
									icon: 'error',
									title: 'Error',
									text: json.error,
								});
							}
							if (json.success) {
								resolve()
								return MySwal.fire({
									icon: 'success',
									title: 'Success!',
									text: 'The server has been deleted!',
								}).then(() => {
									return navigate('/dashboard');
								});
							}
						});
				})
				toast.promise(
					deleteServerPromise,
					{
						pending: 'Deleting server...',
						success: 'The server has been deleted!',
						error: {
							render({ data }) {
								return <a>{data}</a>
							}
						}
					}
				)
			}
		});
	};

	return (
		<>
		<div className="col-12 grid-margin stretch-card">
              <div className="card">
                <div className="card-body">
                  <h3><b>Server Information</b></h3>
                  <hr/>
				   {isLoading ? <h3>Loading</h3> :
				   <>
				   <p><b>Server Name:</b> {server.attributes.name}</p>
                    <p><b>Memory:</b> {server.attributes.limits.memory}MB</p>
                    <p><b>Disk:</b> {server.attributes.limits.disk}MB</p>
                    <p><b>CPU:</b> {server.attributes.limits.cpu}%</p>
					{renewalEnabled ?
										<>
											<p><b>Renew by:</b> {renewal}</p>
											<p><b>Renewal Cost:</b> {renewalCost}</p>
										</>
										:
										<></>
					}
					</>
	}
	<button onClick={redirect} type="button" className="btn btn-success me-2">View</button>
	{renewalEnabled ?
	<button onClick={renewServer} type="button" className="btn btn-success me-2">Renew Server</button> :
										<></>
	}
	<button onClick={deleteServer} type="button" className="btn btn-danger me-2">Delete Server</button>
                  </div>
                </div>
              </div>
		</>
	);
}
