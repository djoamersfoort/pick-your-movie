import { fail, redirect } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { userTable } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import { createSession } from '$lib/server/session';
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
		const res = await db.select().from(userTable).where(eq(userTable.name, cleanName));
		const user = res.at(0);

		if (!user) {
			return fail(401, { name, error: 'Name not found. Please try again.' });
		}

		createSession(cookies, user.bkey);
		throw redirect(307, '/vote');
	}
};
