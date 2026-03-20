import { redirect } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { movieTable } from '$lib/server/db/schema';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.user) throw redirect(307, '/login');

	const movies = await db.select().from(movieTable);

	return {
		user: locals.user,
		movies
	};
};
