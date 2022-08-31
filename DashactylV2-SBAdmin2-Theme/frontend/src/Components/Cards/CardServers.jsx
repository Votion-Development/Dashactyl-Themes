import React from 'react';
import { Link } from 'react-router-dom';



export default function CardServers() {
	const [isLoading, setIsLoading] = React.useState(true);
	const [servers, setServers] = React.useState(String);

	React.useEffect(() => {
		fetch('/api/me', {
			credentials: 'include'
		})
			.then(response => response.json())
			.then(json => {
				setServers(json.servers);
				setIsLoading(false);
			});
	}, []);

	const convertTimestamp = (timestamp) => {
		const convert_timestamp = new Date(timestamp);
		const date = new Intl.DateTimeFormat('en-UK', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(convert_timestamp);
		return date;
	};


	return (
		<>
			<div className="col-xl-8 col-lg-7">
                            <div className="card shadow mb-4">
                                <div
                                    className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                                    <h6 className="m-0 font-weight-bold text-primary">Active Servers</h6>
                                </div>
                                <div className="card-body">
                                    <div className="table-responsive">
                                        <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                                            <thead>
                                                <tr>
                                                    <th>Name</th>
                                                    <th>Memory</th>
                                                    <th>Disk</th>
                                                    <th>CPU</th>
													<th>Renew By</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
											{isLoading ?
                 <p className="text-center"><b>Loading</b></p>
					  : servers.map((server) =>
                                                <tr>
                                                    <td>{server.attributes.name.length > 15 ? server.attributes.name.slice(0, 12) + '...' : server.attributes.name}</td>
                                                    <td>{server.attributes.limits.memory} MB</td>
                                                    <td>{server.attributes.limits.disk} MB</td>
                                                    <td>{server.attributes.limits.cpu}%</td>
													<td>{server.renewal_enabled ?
							convertTimestamp(server.renew_by)
							: <a>Never</a>
							}</td>
                                                    <td><Link to={`/dashboard/manage/${server.attributes.id}`}>
													<button type="button" className="btn btn-primary btn-user btn-block">
                                                Manage
                                            </button>
                                      </Link></td>
                                                </tr>
)}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
		</>
	);
}
