import React from 'react';
import { Link } from 'react-router-dom';
import { w3cwebsocket as W3CWebSocket } from 'websocket';

export default function CardApiKeys() {
    const [isLoading, setIsLoading] = React.useState(true);
    const [keys, setKeys] = React.useState(String);
    const [isConnected, setIsConnected] = React.useState(false)

    React.useEffect(() => {
        fetch('/api/admin/keys/get/all', {
            credentials: 'include'
        })
            .then(response => response.json())
            .then(json => {
                setKeys(json.keys);
                setIsLoading(false);
            });

        const webSocketProtocol = window.location.protocol == 'https:' ? 'wss://' : 'ws://';
        const ws = new W3CWebSocket(`${webSocketProtocol}${window.location.host}/api/admin/keys`);

        ws.onopen = function () {
            if (isConnected === true) return ws.close();
            console.log('Connected to websocket');
            setIsConnected(true);
        };
        ws.onclose = function () {
            console.log('Disconnected from websocket (Close Event)');
            setIsConnected(false);
        };
        ws.addEventListener('message', function (event) {
            if (event.data.toString("utf8") === "stay alive pretty please thanks") return
            const data = JSON.parse(event.data)
            setKeys(data.keys);
        });
        return () => {
            console.log('Disconnected from websocket (Page Leave)');
            setIsConnected(false);
            ws.close();
        };
    }, []);

    return (
        <>
            <div className="col-md-8 grid-margin stretch-card">
              <div className="card">
                <div className="card-body">
                  <h4 className="card-title">API Keys</h4>
                  <div className="table-responsive">   
                    <table className="table table-striped">
                      <thead>
                        <tr>
                          <th> API Key </th>
                          <th> Description </th>
                          <th> Last Used </th>
                          <th> Created At </th>
                          <th> Action </th>
                        </tr>
                      </thead>
                      <tbody>
					  {isLoading ?
                 <p className="text-left"><b>Loading</b></p>
					  :  keys.map((key) =>
                        <tr>
                          <td> {key.key} </td>
                          <td> {key.description.length > 15 ? key.description.slice(0, 12) + '...' : key.description} </td>
                          <td> {key.last_used} </td>
                          <td> {key.created} </td>
                          <td>
						<Link to={`/dashboard/admin/key/${key.key}`}>                
                        <button type="button" className="btn btn-success"> Manage </button>
                        </Link>    
                            </td>
                        </tr>
					  )}
                      </tbody>
                    </table>
                  </div>
                </div>
				</div>
				</div>
        </>
    );
}
