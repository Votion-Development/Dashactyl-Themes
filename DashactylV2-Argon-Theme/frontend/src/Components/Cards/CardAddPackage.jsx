import React from 'react';
import AddPackage from '../../Api/AddPackage';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import 'sweetalert2/dist/sweetalert2.min.css';

const MySwal = withReactContent(Swal);



export default function CardAddPackage() {
	const addPackageForm = (event) => {
		AddPackage(event).then(data => {
			if (data.success) return MySwal.fire({
				icon: 'success',
				title: 'Success!',
				text: 'The package has been added to the database.',
			}).then(() => {
				document.getElementById('addPackageForm').reset();
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
	<div className="row">
		<div className="col-12 grid-margin stretch-card">
              <div className="card">
                <div className="card-body">
                  <h3 className="text-center"><b>Add Package</b></h3>
                  <hr/>
                  <form onSubmit={addPackageForm} id="addPackageForm">
                    <div className="form-group">
                      <label htmlFor="name">Package Name</label>
                      <input type="text" className="form-control" name="name" id="name" placeholder=" " required/>
                    </div>
                    <div className="form-group">
                      <label htmlFor="memory">Ram</label>
                      <input type="text" className="form-control" name="ram" id="ram" placeholder=" " required/>
                    </div>
                    <div className="form-group">
                      <label htmlFor="disk">Disk</label>
                      <input type="text" className="form-control" name="disk" id="disk" placeholder=" " required/>
                    </div>
                    <div className="form-group">
                      <label htmlFor="cpu">CPU</label>
                      <input type="text" className="form-control" name="cpu" id="cpu" placeholder=" " required/>
                    </div>
					<div className="form-group">
                      <label htmlFor="price">Price</label>
                      <input type="text" className="form-control" name="price" id="price" placeholder=" " required/>
                    </div>
                    <div className="form-group">
                      <label htmlFor="renewal_enabled">Renewal Enabled</label>
                      <select className="form-control" id="renewal_enabled" name="renewal_enabled">
					  <option>true</option>
					  <option>false</option>
                      </select>
                    </div>
					<div className="form-group">
                      <label htmlFor="renewal_time">Renewal Time (IN MS)</label>
                      <input type="text" className="form-control" name="renewal_time" id="renewal_time" placeholder=" " required/>
                    </div>
					<div className="form-group">
                      <label htmlFor="renewal_price">Renewal Price</label>
                      <input type="text" className="form-control" name="renewal_price" id="renewal_price" placeholder=" " required/>
                    </div>
					<button type="submit" className="btn btn-primary me-2">Continue</button>
                  </form>
                </div>
              </div>
            </div>
			</div>
		</>
	);
}
