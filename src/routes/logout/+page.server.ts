import { deleteSession } from '$lib/server/session';
import { toLogin } from '$lib/server/redirect';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals, cookies }) => {
	if (locals.user) deleteSession(cookies);
	throw toLogin();
};
