import React from 'react';
import AddEgg from '../../Api/AddEgg';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import 'sweetalert2/dist/sweetalert2.min.css';

const MySwal = withReactContent(Swal);



export default function CardAddEgg() {
	const addEggForm = (event) => {
		AddEgg(event).then(data => {
			if (data.success) return MySwal.fire({
				icon: 'success',
				title: 'Success!',
				text: 'The egg has been added to the database.',
			}).then(() => {
				document.getElementById('addEggForm').reset();
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
                  <h3 className="text-center"><b>Create Egg</b></h3>
                  <hr/>
                  <form onSubmit={addEggForm} id="addEggForm">
                    <div className="form-group">
                      <label htmlFor="name">Egg Name</label>
                      <input type="text" className="form-control" name="name" id="name" placeholder=" " required/>
                    </div>
                    <div className="form-group">
                      <label htmlFor="egg_id">Egg ID</label>
                      <input type="text" className="form-control" name="egg_id" id="egg_id" placeholder=" " required/>
                    </div>
                    <div className="form-group">
                      <label htmlFor="egg_docker_image">Egg Docker Image</label>
                      <input defaultValue="quay.io/pterodactyl/core:java" type="text" className="form-control" name="egg_docker_image" id="egg_docker_image" required/>
                    </div>
                    <div className="form-group">
                      <label htmlFor="egg_startup">Egg Startup</label>
                      <input defaultValue="java -Xms128M -Xmx{{SERVER_MEMORY}}M -Dterminal.jline=false -Dterminal.ansi=true -jar {{SERVER_JARFILE}}" type="text" className="form-control" name="egg_startup" id="egg_startup" required/>
                    </div>
					<div className="form-group">
                      <label htmlFor="egg_databases">Databases</label>
                      <input type="text" className="form-control" name="egg_databases" id="egg_databases" placeholder=" " required/>
                    </div>
					<div className="form-group">
                      <label htmlFor="egg_backups">Backups</label>
                      <input type="text" className="form-control" name="egg_backups" id="egg_backups" placeholder=" " required/>
                    </div>
					<div className="form-group">
                      <label htmlFor="egg_environment">Environment</label>
                      <input defaultValue='{ "SERVER_JARFILE": "server.jar", "BUILD_NUMBER": "latest" }' type="text" className="form-control" name="egg_environment" id="egg_environment" required/>
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
