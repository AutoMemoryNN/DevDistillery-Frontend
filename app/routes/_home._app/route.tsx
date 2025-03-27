import { Outlet } from '@remix-run/react';
import { AppFooter } from '@shared/components/layout/app-footer';
import { ReactNode } from 'react';

export default function AppLayout(): ReactNode {
	return (
		<>
			<Outlet />
			<AppFooter />
		</>
	);
}
