import { LoaderFunctionArgs, TypedResponse, redirect } from '@remix-run/node';
import { getTokenData } from '@shared/lib/session';
import { SessionData } from '@shared/types';

import cookie from 'cookie';

export async function loader({
	request,
}: LoaderFunctionArgs): Promise<TypedResponse<SessionData>> {
	const { session: token } = cookie.parse(
		request.headers.get('Cookie') || 'Not Found',
	);

	const session = await getTokenData(token);
	if (!session) {
		throw redirect('/auth');
	}

	return Response.json(session);
}
