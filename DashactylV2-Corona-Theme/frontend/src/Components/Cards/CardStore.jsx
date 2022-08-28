import React from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import 'sweetalert2/dist/sweetalert2.min.css';

const MySwal = withReactContent(Swal);

export default function CardStore() {
	const [isLoading, setIsLoading] = React.useState(true);
	const [ramPrice, setRamPrice] = React.useState(String);
	const [cpuPrice, setCpuPrice] = React.useState(String);
	const [diskPrice, setDiskPrice] = React.useState(String);

	function purchaseRam() {
		const amount = document.getElementById('ram_amount').value;
		fetch(`/api/store/purchase/ram/${amount}`, {
			method: 'POST',
			credentials: 'include'
		})
			.then(response => response.json())
			.then(json => {
				if (json.success) return MySwal.fire({
					icon: 'success',
					title: 'Success!',
					text: `You have purchased ${amount}MB of Ram!`,
				}).then(() => {
					return document.getElementById('ram_amount').value = '';
				});
				if (json.error) MySwal.fire({
					icon: 'error',
					title: 'Error',
					text: json.error,
				});
			});
	}

	function purchaseCpu() {
		const amount = document.getElementById('cpu_amount').value;
		fetch(`/api/store/purchase/cpu/${amount}`, {
			method: 'POST',
			credentials: 'include'
		})
			.then(response => response.json())
			.then(json => {
				if (json.success) return MySwal.fire({
					icon: 'success',
					title: 'Success!',
					text: `You have purchased ${amount}% of CPU!`,
				}).then(() => {
					return document.getElementById('cpu_amount').value = '';
				});
				if (json.error) MySwal.fire({
					icon: 'error',
					title: 'Error',
					text: json.error,
				});
			});
	}

	function purchaseDisk() {
		const amount = document.getElementById('disk_amount').value;
		fetch(`/api/store/purchase/disk/${amount}`, {
			method: 'POST',
			credentials: 'include'
		})
			.then(response => response.json())
			.then(json => {
				if (json.success) return MySwal.fire({
					icon: 'success',
					title: 'Success!',
					text: `You have purchased ${amount}MB of Disk!`,
				}).then(() => {
					return document.getElementById('disk_amount').value = '';
				});
				if (json.error) MySwal.fire({
					icon: 'error',
					title: 'Error',
					text: json.error,
				});
			});
	}

	React.useEffect(() => {
		fetch('/api/store', {
			credentials: 'include'
		})
			.then(response => response.json())
			.then(json => {
				setRamPrice(json.ram_price);
				setCpuPrice(json.cpu_price);
				setDiskPrice(json.disk_price);
				setIsLoading(false);
			});
	});

	return (
		<>
		<div className="col-12 grid-margin stretch-card">
              <div className="card">
                <div className="card-body">
                  <h3><center><b>Purchase additional Resources</b></center></h3>
				  <div className="d-grid gap-4">
					<hr/>
				  {isLoading ? <p className="text-center"><b>Loading</b></p>
				   :
                    <form className="forms-sample" id="buyresources">
                    <div className="form-group">
                      <label htmlFor="ram_amount">1MB Ram Cost: {ramPrice} coins</label>
                      <input type="text" className="form-control text-white" id="ram_amount" placeholder=" "/>
                    </div>
                    <button onClick={purchaseRam} type="button" className="btn btn-primary me-2">Continue</button>
                     </form> }
					 <hr/>
					 {isLoading ? <p className="text-center"><b>Loading</b></p>
				   :
					  <form className="forms-sample" id="buydisk">
                    <div className="form-group">
                      <label htmlFor="disk_amount">1MB Disk Cost: {diskPrice} coins</label>
                      <input type="text" className="form-control text-white" id="disk_amount" placeholder=" "/>
                    </div>
                    <button onClick={purchaseDisk} type="button" className="btn btn-primary me-2">Continue</button>
                     </form>
}
<hr/>
					{isLoading ? <p className="text-center"><b>Loading</b></p>
				    :
					  <form className="forms-sample" id="buydisk">
                    <div className="form-group">
                      <label htmlFor="cpu_amount">1% CPU Cost: {cpuPrice} coins</label>
                      <input type="text" className="form-control text-white" id="cpu_amount" placeholder=" "/>
                    </div>
                    <button onClick={purchaseCpu} type="button" className="btn btn-primary me-2">Continue</button>
                     </form>
}
<hr/>
</div>
</div>
</div>
</div>
		</>
	);
}
