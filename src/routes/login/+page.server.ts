import { fail, redirect } from '@sveltejs/kit';
import { createSession } from '$lib/server/session';
import { toVote } from '$lib/server/redirect';
import { getUserByName } from '$lib/server/login/queries';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	if (locals.user) throw redirect(307, '/vote');
};

export const actions: Actions = {
	default: async ({ cookies, request }) => {
		const formData = await request.formData();
		const name = formData.get('name');

		if (typeof name !== 'string') {
			return fail(400, { name: '', error: 'Please enter a valid name.' });
		}

		const cleanName = name.trim().toLowerCase();
		const user = await getUserByName(cleanName);

		if (!user) {
			return fail(401, { name, error: 'Name not found. Please try again.' });
		}

		createSession(cookies, user.bkey);
		throw toVote();
	}
};
