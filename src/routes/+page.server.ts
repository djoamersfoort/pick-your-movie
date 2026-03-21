import type { PageServerLoad } from './$types';
import { toLogin, toVote } from '$lib/server/redirect';

export const load: PageServerLoad = async ({ locals }) => {
	throw locals.user ? toVote() : toLogin();
};
