import React from 'react';
import { w3cwebsocket as W3CWebSocket } from 'websocket';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import 'sweetalert2/dist/sweetalert2.min.css';

const MySwal = withReactContent(Swal);



import CardStats from '../Cards/CardStats';

export default function HeaderStats() {
	const [isLoading, setIsLoading] = React.useState(true);
	const [ram, setRam] = React.useState(String);
	const [cpu, setCPU] = React.useState(String);
	const [disk, setDisk] = React.useState(String);
	const [servers, setServers] = React.useState(String);
	const [isConnected, setIsConnected] = React.useState(false);

	React.useEffect(() => {
		const webSocketProtocol = window.location.protocol == 'https:' ? 'wss://' : 'ws://';
		const ws = new W3CWebSocket(`${webSocketProtocol}${window.location.host}/api/watch`);

		ws.onopen = function () {
			if (isConnected === true) return ws.close();
			console.log('Connected to websocket');
			setIsConnected(true);
		};
		ws.onclose = function () {
			console.log('Disconnected from websocket (Close Event)');
		};
		ws.addEventListener('message', function (event) {
			if (event.data.toString("utf8") === "stay alive pretty please thanks") return
			const data = JSON.parse(event.data);
			if (data.error) MySwal.fire({
				icon: 'error',
				title: 'Error',
				text: data.error,
			});
			setRam(`${data.stats.used_ram}MB/${data.stats.total_ram}MB`);
			setCPU(`${data.stats.used_cpu}%/${data.stats.total_cpu}%`);
			setDisk(`${data.stats.used_disk}MB/${data.stats.total_disk}MB`);
			setServers(`${data.servers.length}`);
		});
		return () => {
			console.log('Disconnected from websocket (Page Leave)');
			ws.close();
		};
	}, []);

	React.useEffect(() => {
		fetch('/api/me', {
			credentials: 'include'
		})
			.then(response => response.json())
			.then(json => {
				setRam(`${json.stats.used_ram}MB / ${json.stats.total_ram}MB`);
				setCPU(`${json.stats.used_cpu}% / ${json.stats.total_cpu}%`);
				setDisk(`${json.stats.used_disk}MB / ${json.stats.total_disk}MB`);
				setServers(`${json.servers.length} Servers`);
				setIsLoading(false);
			});
	}, []);

	return (
		<>
		 <div className="col-xl-3 col-lg-6">
              <div className="card card-stats mb-4 mb-xl-0">
                <div className="card-body">
                  <div className="row">
				  <CardStats
									statSubtitle="Memory"
									statTitle={ram}
									isLoading={isLoading} />
                    <div className="col-auto">
                      <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                        <i className="fas fa-chart-bar"></i>
                      </div>
                    </div>
                  </div>
                  <p className="mt-3 mb-0 text-muted text-sm">
                    <span className="text-success mr-2">Fetched</span>
                    <span className="text-nowrap">from <strong>API</strong></span>
                  </p>
                </div>
              </div>
            </div>
			<div className="col-xl-3 col-lg-6">
              <div className="card card-stats mb-4 mb-xl-0">
                <div className="card-body">
                  <div className="row">
				  <CardStats
									statSubtitle="Disk"
									statTitle={disk}
									isLoading={isLoading}
								/>
                    <div className="col-auto">
                      <div className="icon icon-shape bg-gradient-orange text-white rounded-circle shadow">
                        <i className="fas fa-memory"></i>
                      </div>
                    </div>
                  </div>
                  <p className="mt-3 mb-0 text-muted text-sm">
                    <span className="text-success mr-2">Fetched</span>
                    <span className="text-nowrap">from <strong>API</strong></span>
                  </p>
                </div>
              </div>
            </div>
			<div className="col-xl-3 col-lg-6">
              <div className="card card-stats mb-4 mb-xl-0">
                <div className="card-body">
                  <div className="row">
				  <CardStats
									statSubtitle="CPU"
									statTitle={cpu}
									isLoading={isLoading}
								/>
                    <div className="col-auto">
                      <div className="icon icon-shape bg-gradient-green text-white rounded-circle shadow">
                        <i className="fas fa-microchip"></i>
                      </div>
                    </div>
                  </div>
                  <p className="mt-3 mb-0 text-muted text-sm">
                    <span className="text-success mr-2">Fetched</span>
                    <span className="text-nowrap">from <strong>API</strong></span>
                  </p>
                </div>
              </div>
            </div>
			<div className="col-xl-3 col-lg-6">
              <div className="card card-stats mb-4 mb-xl-0">
                <div className="card-body">
                  <div className="row">
				  <CardStats
									statSubtitle="Servers"
									statTitle={servers}
									isLoading={isLoading}
								/>
                    <div className="col-auto">
                      <div className="icon icon-shape bg-info text-white rounded-circle shadow">
                        <i className="far fa-hdd"></i>
                      </div>
                    </div>
                  </div>
                  <p className="mt-3 mb-0 text-muted text-sm">
                    <span className="text-success mr-2">Fetched</span>
                    <span className="text-nowrap">from <strong>API</strong></span>
                  </p>
                </div>
              </div>
            </div>
		</>
	);
}
