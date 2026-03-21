import { redirect } from '@sveltejs/kit';
import { deleteSession } from '$lib/server/session';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals, cookies }) => {
	if (locals.user) deleteSession(cookies);
	throw redirect(307, '/login');
};
