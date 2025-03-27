import type { SessionData } from '@shared/types';

import React from 'react';

import { importSPKI, jwtVerify } from 'jose';

export async function getTokenData(
	token?: string | null,
): Promise<SessionData | null> {
	if (!token) {
		return null;
	}

	const publicKeyPEM = import.meta.env.VITE_JWT_PUBLIC_KEY;
	const publicKey = await importSPKI(publicKeyPEM, 'RS256');

	try {
		const { payload } = await jwtVerify(token, publicKey);
		const { username, alias, email } = payload;
		const session = { username, alias, email };
		return session as SessionData;
	} catch (_error) {
		return null;
	}
}

export const SessionContext = React.createContext<SessionData | null>(null);

export function useSession(): SessionData {
	const session = React.useContext(SessionContext);
	if (!session) {
		throw new Error('useSession must be inside a SessionProvider');
	}
	return session;
}
