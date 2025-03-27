import { Link } from '@remix-run/react';

import React from 'react';

import styles from './app-footer.module.css';

export function AppFooter(): React.ReactNode {
	return (
		<footer className={styles.appFooter}>
			<div className='container mx-auto'>
				<p>
					&copy; 2021{' '}
					<Link to='/' className='underline'>
						Remix
					</Link>
				</p>
			</div>
		</footer>
	);
}
