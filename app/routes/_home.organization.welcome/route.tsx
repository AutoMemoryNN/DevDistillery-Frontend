import { useSession } from '@shared/lib/session';
import { ReactElement } from 'react';

export default function WelcomeHomePage(): ReactElement {
	const session = useSession();
	return (
		<div className='p-4 bg-blue-100 rounded-lg shadow-md text-center'>
			<h1 className='text-xl font-bold text-gray-800'>
				Welcome New User, {session.alias}!
			</h1>
			<p className='text-gray-600'>We hope you enjoy your stay here.</p>
		</div>
	);
}
