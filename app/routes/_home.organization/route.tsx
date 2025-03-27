import { Button } from '@heroui/button';
import { Outlet, useNavigate } from '@remix-run/react';
import { useState } from 'react';

import { ReactElement } from 'react';

import styles from './organization.module.css';

export default function Layout(): ReactElement {
	const navigate = useNavigate();
	const [isTeamsOpen, setIsTeamsOpen] = useState(false);

	return (
		<div className={styles['main-container']}>
			{/* Sidebar */}
			<aside className={styles['aside-nav']}>
				{/* Organization Dropdown */}
				<div className='mb-4'>
					<Button variant='ghost' className='w-full justify-between'>
						Organization Name
					</Button>
					<hr className='mt-2 border-gray-300' />
				</div>

				{/* Teams Dropdown */}
				<div className='mb-4'>
					<Button
						className='border rounded-sm w-full flex justify-between'
						variant='ghost'
						radius='sm'
						onClick={(): void => setIsTeamsOpen(!isTeamsOpen)}
					>
						Teams
					</Button>
					{/* Projects (subitems) */}
					{isTeamsOpen && (
						<div className='ml-4 mt-1'>
							<Button
								variant='ghost'
								className='text-left w-full'
							>
								Projects
							</Button>
						</div>
					)}
				</div>

				{/* Settings */}
				<div className='absolute bottom-4 left-4'>
					<Button
						variant='ghost'
						onPress={(): void => navigate('/organization/settings')}
					>
						Settings
					</Button>
				</div>
			</aside>

			{/* Main Content */}
			<main className='flex-1 p-6 border border-gray-300 bg-white m-2 shadow-md rounded-sm'>
				<div>
					<Outlet />
				</div>
			</main>
		</div>
	);
}
