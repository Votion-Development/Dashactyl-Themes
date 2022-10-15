import React from 'react';
import AddLocation from '../../Api/AddLocation';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import 'sweetalert2/dist/sweetalert2.min.css';

const MySwal = withReactContent(Swal);



export default function CardAddLocation() {
	const addLocationForm = (event) => {
		AddLocation(event).then(data => {
			if (data.success) return MySwal.fire({
				icon: 'success',
				title: 'Success!',
				text: 'The location has been added to the database.',
			}).then(() => {
				document.getElementById('addLocationForm').reset();
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
			         <div className="col-xl-4 col-lg-5">
                            <div className="card shadow mb-4">
                                <div
                                    className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                                    <h6 className="m-0 font-weight-bold text-primary">Add Location</h6>
                                    
                                </div>
                                <div className="card-body">
                                <form id="addLocationForm" onSubmit={addLocationForm}>
                    <div className="form-group">
                      <label htmlFor="location_name">Name</label>
                      <input type="text" className="form-control" name="location_name" id="location_name" placeholder=" " required/>
                    </div>
					<div className="form-group">
                      <label htmlFor="location_id">ID</label>
                      <input type="text" className="form-control" name="location_id" id="location_id" placeholder=" " required/>
                    </div>
					<div className="form-group">
                      <label htmlFor="location_enabled">Enabled</label>
                      <select className="form-control form-control-lg" id="location_enabled" name="location_enabled">
                        <option>true</option>
                        <option>false</option>
                      </select>
                    </div>
					<button type="submit" className="btn btn-primary me-2">Continue</button>
                    </form>
                                </div>
                            </div>
                        </div>
		</>
	);
}
