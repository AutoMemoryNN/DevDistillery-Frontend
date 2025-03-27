import type { loader } from './loader';

import { Outlet, useLoaderData } from '@remix-run/react';
import { SessionContext } from '@shared/lib/session';

import React from 'react';

export { loader } from './loader';

export default function HomeLayout(): React.ReactNode {
	const session = useLoaderData<typeof loader>();
	return (
		<SessionContext.Provider value={session}>
			<Outlet />
		</SessionContext.Provider>
	);
}
