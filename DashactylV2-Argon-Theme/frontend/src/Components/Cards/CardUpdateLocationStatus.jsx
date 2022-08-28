import React from 'react';
import UpdateLocationStatus from '../../Api/UpdateLocationStatus';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import 'sweetalert2/dist/sweetalert2.min.css';

const MySwal = withReactContent(Swal);

export default function CardUpdateLocationStatus() {
	const [isLoading, setIsLoading] = React.useState(true);
	const [locations, setLocations] = React.useState(String);

	React.useEffect(() => {
		fetch('/api/admin/location/get/all', {
			credentials: 'include'
		})
			.then(response => response.json())
			.then(json => {
				setLocations(json);
				setIsLoading(false);
			});
	}, []);

	const updateLocationStatusForm = (event) => {
		UpdateLocationStatus(event).then(data => {
			if (data.success) return MySwal.fire({
				icon: 'success',
				title: 'Success!',
				text: 'The location has been update.',
			}).then(() => {
				document.getElementById('updateLocationStatusForm').reset();
				fetch('/api/admin/location/get/all', {
					credentials: 'include'
				})
					.then(response => response.json())
					.then(json => {
						setLocations(json);
						setIsLoading(false);
					});
			});
			if (data.error) MySwal.fire({
				icon: 'error',
				title: 'Error',
				text: data.error,
			});
		});
	};
	return (
		<>
			<div className="col-md-4 grid-margin stretch-card">
                <div className="card">
                  <div className="card-body">
                    <h4 className="card-title">Update Location Status</h4>
					<hr/>
                {isLoading ? <h3 className="text-center">Loading</h3> :
					<form id="updateLocationStatusForm" onSubmit={updateLocationStatusForm}>
					<div className="form-group">
                      <label htmlFor="location">Location</label>
                      <select className="form-control form-control-lg" id="location" name="location">
					  {locations.map((location) =>
						<option value={location.id}>{location.name} - Currently Enabled: {location.enabled.toString()}</option>
					)}
                      </select>
                    </div>
					<div className="form-group">
                      <label htmlFor="status">Status</label>
                      <select className="form-control form-control-lg" id="status" name="status">
					  <option>true</option>
					  <option>false</option>
                      </select>
                    </div>
					<button type="submit" className="btn btn-primary me-2">Continue</button>
                    </form>
}
                  </div>
                </div>
              </div>


			  <div className="col-md-4 grid-margin stretch-card">
                <div className="card">
                  <div className="card-body">
                    <h4 className="card-title">Little Easter Egg Lol</h4>
					<hr/>
					<p className="text-center">Heyy there, thank you for downloading the Argon Theme</p>
					<p className="text-center">Join my Discord Server for more Themes like this</p>
					<p className="text-center"><a href="https://discord.gg/McFr2jwNSE">https://discord.gg/McFr2jwNSE</a></p>
					<p className="text-center">Hope you will like it :3</p>
                  </div>
                </div>
              </div>
		</>
	);
}
