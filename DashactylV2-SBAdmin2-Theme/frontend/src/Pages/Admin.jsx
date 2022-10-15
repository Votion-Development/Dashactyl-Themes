import React from 'react';

import CardAddEgg from '../Components/Cards/CardAddEgg';
import CardAddLocation from '../Components/Cards/CardAddLocation';
import CardUpdateLocationStatus from '../Components/Cards/CardUpdateLocationStatus';
import CardAddPackage from '../Components/Cards/CardAddPackage';
import CardGetUserInfo from '../Components/Cards/CardGetUserInfo';
import CardApiKeys from '../Components/Cards/CardApiKeys';
import CardCreateApiKey from '../Components/Cards/CardCreateApiKey';
import CardDashboardInfo from '../Components/Cards/CardDashboardInfo'

export default function Admin() {
	return (
		<>
			<div className="row">
				<CardDashboardInfo />
				<CardGetUserInfo />
			</div>
		   <hr/>
			<div className="row">
				<CardCreateApiKey />
				<CardApiKeys />
			</div>
			<hr/>
			<div className="row">
				<CardAddLocation />
				<CardUpdateLocationStatus />
			</div>
			<hr/>
			<CardAddPackage />
			<hr/>
			<CardAddEgg />
		</>
	);
}
