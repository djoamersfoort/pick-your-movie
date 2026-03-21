import { redirect } from '@sveltejs/kit';

export const toLogin = () => redirect(307, '/login');
export const toVote = () => redirect(307, '/vote');
