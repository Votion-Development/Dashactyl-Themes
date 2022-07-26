import React from 'react';
import { useSearchParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import 'sweetalert2/dist/sweetalert2.min.css';

const MySwal = withReactContent(Swal);

import CardServers from '../Components/Cards/CardServers';
import CardInfo from '../Components/Cards/CardInfo';

export default function Dashboard() {
	const [searchParams, setSearchParams] = useSearchParams();
	const generated_password = searchParams.get("generatedpassword")
	if (!generated_password) {
	} else {
		MySwal.fire({
			icon: 'info',
			title: 'Generated Password',
			text: `Your generated password to login to the client area and the game  with your discord email is ${generated_password}. Please write this down in a safe place.`,
		}).then(() => {
			setSearchParams('')
		})
	}
	return (
		<>
			<div className="row">
					<CardServers />
					<CardInfo />
			</div>
		</>
	);
}
