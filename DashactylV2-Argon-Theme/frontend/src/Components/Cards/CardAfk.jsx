import React from 'react';

export default function CardAfk({ isConnected, coins, time }) {
	const [isLoading, setIsLoading] = React.useState(true);
	const [afkInterval, setAfkInterval] = React.useState(null);
	const [afkCoins, setAfkCoins] = React.useState(null);

	React.useEffect(() => {
		fetch('/api/afk', {
			credentials: 'include'
		})
			.then(response => response.json())
			.then(json => {
				setAfkInterval(json.afk_interval);
				setAfkCoins(json.afk_coins);
				setIsLoading(false);
			});
	}), [];

	return (
		<>
		  <div className="col-xl-12">
                    <div className="card">
                        <div className="card-header border-0">
                            <div className="row align-items-center">
                            </div>
                        </div>
                        <div className="card-body">
						<h3 className="text-center"><b>Welcome to the AFK Portal</b></h3>
                  <hr/>
                  <p className="text-center"><b>Stay idle to earn coins.</b></p>
                   <hr/>
                   <div id="afk_main">
				   <p className="text-center"><b>Websocket Status: {isConnected ? <a className="text-green-500">Connected</a> : <a className="text-red-500">Disconnected</a>}</b></p>
                    <p className="text-center"><b>Every {afkInterval} seconds, you will earn {afkCoins} coins.</b></p>
                    <p className="text-center"><b>You have been idling for:  {time} seconds.</b></p>
                    <p className="text-center"><b>You have currently gained {coins} coins.</b></p>
                  </div>
                        </div>
                    </div>
                </div>
		</>
	);
}
