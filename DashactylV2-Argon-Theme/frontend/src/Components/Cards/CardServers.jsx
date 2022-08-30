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
		         <div className="col-xl-8">
              <div className="card">
                  <div className="card-header border-0">
                      <div className="row align-items-center">
                          <div className="col">
                              <h3 className="mb-0">Your Servers</h3>
                          </div>
                          <div className="col text-right">
                              <a href="/servers" className="btn btn-sm btn-primary">List all</a>
                          </div>
                      </div>
                  </div>
                  <div className="table-responsive">
                      <table className="table align-items-center table-flush">
                          <thead className="thead-light">
                              <tr>
                                  <th scope="col">Name</th>
                                  <th scope="col">Memory</th>
                                  <th scope="col">Disk</th>
                                  <th scope="col">CPU</th>
								  <th scope="col">Renew By</th>
                                  <th scope="col">Manage</th>
                              </tr>
                          </thead>
                          <tbody>
						  {isLoading ?
                 <p className="text-center"><b>Loading</b></p>
					  : servers.map((server) =>
                              <tr>
                                  <td>
								  {server.attributes.name.length > 15 ? server.attributes.name.slice(0, 12) + '...' : server.attributes.name}
                                  </td>
                                  <td>
								  {server.attributes.limits.memory} MB
                                  </td>
                                  <td>
								  {server.attributes.limits.disk} MB
                                  </td>
                                  <td>
								  {server.attributes.limits.cpu}%
                                  </td>
								  <td>
								  {server.renewal_enabled ?
							convertTimestamp(server.renew_by)
							: <a>Never</a>
							}
								  </td>
                                  <td>
								  <Link to={`/dashboard/manage/${server.attributes.id}`}>
                                          <button className="btn btn-icon btn-primary" type="button">
                                              <span className="btn-inner--icon"><i className="ni ni-atom"></i></span>
                                          </button>
                                      </Link>
                                  </td>
                              </tr>
)}
                          </tbody>
                      </table>
                  </div>
              </div>
			  </div>
		</>
	);
}
