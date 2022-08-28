import React from 'react';
import getUserInfo from '../../Api/GetUserInfo';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import 'sweetalert2/dist/sweetalert2.min.css';

const MySwal = withReactContent(Swal);

export default function CardGetUserInfo() {
	const getUserInfoForm = (event) => {
		getUserInfo(event).then(data => {
			if (data.success) return MySwal.fire({
				icon: 'info',
				title: 'User info:',
				html: `<p>Username: ${data.info.username}</p><p>Email: ${data.info.email}</p><p>ID: ${data.info._id}</p><p>Coins: ${data.info.coins}</p><p>Package: ${data.info.package}</p><p>Pterodactyl ID: ${data.info.pterodactyl_id}</p><p>Used CPU: ${data.info.used_cpu}</p><p>Used Disk: ${data.info.used_disk}</p><p>Used Ram: ${data.info.used_ram}</p><p>Extra CPU: ${data.info.extra.cpu}</p><p>Extra Disk: ${data.info.extra.disk}</p><p>Extra Ram: ${data.info.extra.ram}</p>`,
			}).then(() => {
				document.getElementById('getUserInfoForm').reset();
			});
			if (data.error) MySwal.fire({
				icon: 'error',
				title: 'Error',
				text: data.error,
			}).then(() => {
				document.getElementById('getUserInfoForm').reset();
			});
		});
	};
	return (
		<>
			<div className="col-md-4 grid-margin stretch-card">
                <div className="card">
                  <div className="card-body">
                    <h4 className="card-title">Get User Info</h4>
					<hr/>
					<form id="getUserInfoForm" onSubmit={getUserInfoForm}>
                    <div className="form-group">
                      <label htmlFor="email">Email</label>
                      <input type="text" className="form-control" name="email" id="email" placeholder=" " required/>
                    </div>
					<button type="submit" className="btn btn-primary me-2">Continue</button>
                    </form>
                  </div>
                </div>
              </div>
		</>
	);
}
