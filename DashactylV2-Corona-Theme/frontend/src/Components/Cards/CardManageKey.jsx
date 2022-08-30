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
		<div className="col-12 grid-margin stretch-card">
              <div className="card">
                <div className="card-body">
                  <h3><b>API Key Information</b></h3>
                  <hr/>
				   {isLoading ? <h3>Loading</h3> :
				   <>
				   <p><b>API Key:</b> {key.key}</p>
                    <p><b>Description:</b> {key.description}</p>
                    <p><b>Last Used:</b> {key.last_used}</p>
                    <p><b>Created At:</b> {key.created}</p>
					<button onClick={deleteApiKey} type="button" className="btn btn-danger me-2">Delete</button>
					</>
	}
                  </div>
                </div>
              </div>
		</>
	);
}
