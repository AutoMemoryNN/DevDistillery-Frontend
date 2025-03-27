import type { LinksFunction } from '@remix-run/node';

import { PublicClientApplication } from '@azure/msal-browser';
import { MsalProvider } from '@azure/msal-react';
import { HeroUIProvider } from '@heroui/system';
import {
	Links,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
} from '@remix-run/react';

import React from 'react';

import './tailwind.css';

export const links: LinksFunction = () => [
	{ rel: 'preconnect', href: 'https://fonts.googleapis.com' },
	{
		rel: 'preconnect',
		href: 'https://fonts.gstatic.com',
		crossOrigin: 'anonymous',
	},
	{
		rel: 'stylesheet',
		href: 'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap',
	},
];

const msalInstance = new PublicClientApplication({
	auth: {
		clientId: import.meta.env.MSAL_CLIENT_ID || '',
		authority: import.meta.env.MSAL_AUTHORITY,
		postLogoutRedirectUri: import.meta.env.REDIRECT_URI,
		navigateToLoginRequestUrl: false,
	},
});

export function Layout({
	children,
}: { children: React.ReactNode }): React.ReactNode {
	return (
		<html lang='en'>
			<head>
				<meta charSet='utf-8' />
				<meta
					name='viewport'
					content='width=device-width, initial-scale=1'
				/>
				<Meta />
				<Links />
			</head>
			<body>
				<HeroUIProvider>
					{children}
					<ScrollRestoration />
					<Scripts />
				</HeroUIProvider>
			</body>
		</html>
	);
}

export default function App(): React.ReactNode {
	return (
		<MsalProvider instance={msalInstance}>
			<Outlet />
		</MsalProvider>
	);
}
