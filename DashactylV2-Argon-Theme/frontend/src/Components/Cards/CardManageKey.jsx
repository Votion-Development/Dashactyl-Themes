import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import 'sweetalert2/dist/sweetalert2.min.css';

const MySwal = withReactContent(Swal);

import { toast } from 'react-toastify'

export default function CardManageServer() {
	const [isLoading, setIsLoading] = React.useState(true);
    const [key, setKey] = React.useState(String)

	const params = useParams();
	const navigate = useNavigate();

	React.useEffect(() => {
		fetch(`/api/admin/keys/get/${params.key}`, {
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
				if (!json.key) return MySwal.fire({
					icon: 'error',
					title: 'Error',
					text: "Key not found.",
				}).then(() => {
					navigate('/dashboard/admin');
				});
				setKey(json.key);
                setIsLoading(false)
			});
	}, []);

	const deleteApiKey = () => {
		const deleteApiKeyPromise = new Promise(async (resolve, reject) => {
			fetch(`/api/admin/keys/delete/${params.key}`, {
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
							text: 'The API key has been deleted!',
						}).then(() => {
							return navigate('/dashboard/admin');
						});
					}
				});
		})
		toast.promise(
			deleteApiKeyPromise,
			{
				pending: 'Deleting API key...',
				success: 'The API key has been deleted!',
				error: {
					render({ data }) {
						return <a>{data}</a>
					}
				}
			}
		)
	};

	return (
		<>
			    <div className="col-xl-12">
                    <div className="card">
                        <div className="card-header border-0">
                            <div className="row align-items-center">
                                <div className="col">
                                    <h3 className="mb-0">API Key Information</h3>
                                </div>
                            </div>
                        </div>
                        <div className="card-body">
						{isLoading ? <h3>Loading</h3> :
                            <form>
                                <div className="form-group">
                                    <label htmlFor="serverName">API Key</label>
                                    <input type="text" className="form-control form-control-alternative"
                                        placeholder={key.key} id="name" disabled/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="serverMemory">Description</label>
									<input type="text" className="form-control form-control-alternative"
                                        placeholder={key.description} id="ram" disabled/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="serverDisk">Last Used</label>
                                    <input type="text" className="form-control form-control-alternative"
                                        placeholder={key.last_used} id="disk" disabled/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="serverCPU">Created At</label>
                                    <input type="text" className="form-control form-control-alternative"
                                        placeholder={key.created} id="cpu" disabled/>
                                </div>
	<button onClick={deleteApiKey} type="button" className="btn btn-danger me-2">Delete</button>
                            </form>
}
                        </div>

                    </div>
                </div>
		</>
	);
}
