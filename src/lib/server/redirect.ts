import { redirect } from '@sveltejs/kit';

export const toLogin = () => redirect(303, '/login');
export const toVote = () => redirect(303, '/vote');
