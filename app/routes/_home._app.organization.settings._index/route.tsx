import { Button } from '@heroui/button';
import { Input, Textarea } from '@heroui/input';
import { Form, useNavigate } from '@remix-run/react';
import { ChangeEvent, FC, FormEvent, useState } from 'react';

import { useSession } from '@shared/lib/session';
import styles from '@shared/styles/app-layout.module.css';

const Settings: FC = () => {
	const navigate = useNavigate();
	const [showOrgSettings, setShowOrgSettings] = useState(true);
	const [isOrgOwner] = useState(true);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const session = useSession();

	// Organization data
	const [orgData, setOrgData] = useState({
		name: 'My Organization',
		description: 'Organization description',
	});

	const handleOrgChange = (
		e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	): void => {
		const { name, value } = e.target;
		setOrgData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleUserChange = (e: ChangeEvent<HTMLInputElement>): void => {
		const { name, value } = e.target;
		// Update the user data
		console.log('User Updated:', name, value);
	};

	const handleOrgSubmit = (e: FormEvent): void => {
		e.preventDefault();
		setIsSubmitting(true);

		try {
			console.log('Organization Updated:', orgData);
			// Logic to update the organization would go here

			// Simulate an asynchronous operation
			setTimeout(() => {
				setIsSubmitting(false);
			}, 1000);
		} catch (error) {
			console.error('Error', error);
			setIsSubmitting(false);
		}
	};

	const handleUserSubmit = (e: FormEvent): void => {
		e.preventDefault();
		setIsSubmitting(true);

		try {
			console.log('User Updated:', session.alias);
			// Logic to update the user would go here

			// Simulate an asynchronous operation
			setTimeout(() => {
				setIsSubmitting(false);
			}, 1000);
		} catch (error) {
			console.error('Error', error);
			setIsSubmitting(false);
		}
	};

	return (
		<div className='min-w-full min-h-screen max-w-4xl mx-auto p-6 bg-gradient-to-br from-blue-500 to-purple-600 dark:from-gray-900 dark:to-gray-800'>
			<h1 className='text-2xl font-bold mb-6'>Settings</h1>

			{/* Navigation Tabs */}
			<div className='flex mb-6 border-b border-gray-200'>
				{isOrgOwner && (
					<Button
						variant='ghost'
						color='primary'
						className={`${
							showOrgSettings
								? 'border-b-2 border-blue-500 text-blue-600'
								: 'text-gray-500'
						}`}
						onPress={(): void => setShowOrgSettings(true)}
					>
						Organization
					</Button>
				)}
				<Button
					variant='ghost'
					className={`${
						!showOrgSettings
							? 'border-b-2 border-blue-500 text-blue-600'
							: 'text-gray-500'
					}`}
					onPress={(): void => setShowOrgSettings(false)}
				>
					User Profile
				</Button>
			</div>

			{/* Conditional Content */}
			<div className='bg-white p-6 rounded-lg shadow-md'>
				{showOrgSettings ? (
					// Organization Settings
					<Form className='space-y-6' onSubmit={handleOrgSubmit}>
						<h2 className='text-xl font-semibold mb-4'>
							Organization Information
						</h2>

						<div>
							<Input
								label='Organization Name'
								size='sm'
								isRequired={true}
								name='name'
								value={orgData.name}
								onChange={handleOrgChange}
							/>
						</div>

						<div>
							<Textarea
								label='Description'
								isRequired={true}
								name='description'
								value={orgData.description}
								onChange={handleOrgChange}
							/>
						</div>

						<div className='flex justify-end pt-4'>
							<Button
								onPress={(): void => navigate('/organization')}
							>
								Cancel
							</Button>

							<Button
								color='primary'
								type='submit'
								disabled={isSubmitting}
							>
								{isSubmitting ? 'Saving...' : 'Save changes'}
							</Button>
						</div>
					</Form>
				) : (
					// User Settings
					<Form className='space-y-6' onSubmit={handleUserSubmit}>
						<h2 className='text-xl font-semibold mb-4'>
							User Information
						</h2>

						<div>
							<Input
								label='Full Name'
								size='sm'
								isRequired={true}
								name='name'
								value={session.username}
								onChange={handleUserChange}
							/>
						</div>

						<div>
							<Input
								label='Email'
								size='sm'
								isRequired={true}
								name='email'
								value={session.email}
								onChange={handleUserChange}
								isReadOnly={true}
							/>
							<p className='text-sm text-gray-500 mt-1'>
								Email cannot be changed
							</p>
						</div>

						<div className='flex justify-end pt-4'>
							<Button
								onPress={(): void => navigate('/organization')}
							>
								Cancel
							</Button>
							<Button
								color='primary'
								type='submit'
								disabled={isSubmitting}
							>
								{isSubmitting ? 'Saving...' : 'Save changes'}
							</Button>
						</div>
					</Form>
				)}
			</div>
		</div>
	);
};

export default Settings;
