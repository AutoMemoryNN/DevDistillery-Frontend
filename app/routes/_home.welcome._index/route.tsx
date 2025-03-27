import { Button } from '@heroui/button';
import { Input } from '@heroui/input';
import { Form } from '@remix-run/react';
import { useNavigate } from '@remix-run/react';
import { axios } from '@shared/lib/axios';
import { useSession } from '@shared/lib/session';

import styles from '@shared/styles/app-layout.module.css';
import React from 'react';

export default function Index(): React.ReactElement {
	const session = useSession();
	const [username, setUsername] = React.useState(session.username);
	const navigate = useNavigate();

	const handleSubmit = async (event: React.FormEvent): Promise<void> => {
		event.preventDefault();
		const formData = new FormData(event.target as HTMLFormElement);
		const nickname = formData.get('username') as string;

		try {
			const response = await axios.post('/your-endpoint', {
				alias: nickname,
			});

			console.log('Success:', response.data);
		} catch (_error) {
			return navigate('/organization/welcome');
		}
	};

	return (
		<div className={styles['app-container']}>
			<div className={styles['decorative-box-lg']}>
				<h1 className='text-3xl font-bold text-blue-600 mb-4'>
					{username ? `Welcome ${username}!` : 'Hi there unknown!'}
				</h1>
				<Form
					className='flex flex-col space-y-4'
					onSubmit={handleSubmit}
				>
					<div>
						<Input
							color='primary'
							label='Nickname'
							type='text'
							name='username'
							isRequired={true}
							size='lg'
							value={username}
							onValueChange={setUsername}
						/>
					</div>
					<Button type='submit' color='primary'>
						Yea! That name
					</Button>
				</Form>
			</div>
		</div>
	);
}
