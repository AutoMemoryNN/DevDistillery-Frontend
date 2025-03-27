import { ActionFunctionArgs } from '@remix-run/node';

export async function action({
	request,
}: ActionFunctionArgs): Promise<Response> {
	const formData = await request.formData();
	const username = formData.get('username');

	console.log('FormData:', formData);

	return Response.json({ message: `Hello, ${username}!` });
}
