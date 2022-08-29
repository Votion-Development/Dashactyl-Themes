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
                <div className="col-xl-12">
                    <div className="card">
                        <div className="card-header border-0">
                            <div className="row align-items-center">
                                <div className="col">
                                    <h3 className="mb-0">Purchase additional Resources</h3>
                                </div>
                            </div>
                        </div>
                        <div className="card-body">
							{isLoading ? <p className="text-center"><b>Loading</b></p>
				   :
                            <form>
                                <div className="form-group">
                                    <label htmlFor="ram_amount">1MB Ram Cost: {ramPrice} coins</label>
                                    <input type="text" className="form-control form-control-alternative"
                                        name="ram_amount" id="ram_amount" placeholder=" " required/>
                                </div>
                                <button onClick={purchaseRam} type="button" className="btn btn-outline-default">Buy</button>
                            </form> }
                            <hr/>
							{isLoading ? <p className="text-center"><b>Loading</b></p>
				   :
                            <form>
                                <div className="form-group">
                                    <label htmlFor="disk_amount">1MB Disk Cost: {diskPrice} coins</label>
                                    <input type="text" className="form-control form-control-alternative"
                                        name="disk_amount" id="disk_amount" placeholder=" " required/>
                                </div>
                                <button onClick={purchaseDisk} type="button" className="btn btn-outline-default">Buy</button>
                            </form> }
                            <hr/>
							{isLoading ? <p className="text-center"><b>Loading</b></p>
				   :
                            <form>
                                <div className="form-group">
                                    <label htmlFor="cpu_amount">1% CPU Cost: {cpuPrice} coins</label>
                                    <input type="text" className="form-control form-control-alternative"
                                        name="cpu_amount" id="cpu_amount" placeholder=" " required/>
                                </div>
                                <button onClick={purchaseCpu} type="button" className="btn btn-outline-default">Buy</button>
                            </form> }
                            <hr/>
                        </div>
                    </div>
                </div>
		</>
	);
}
