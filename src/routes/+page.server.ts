import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	throw redirect(307, locals.user ? '/vote' : '/login');
};
