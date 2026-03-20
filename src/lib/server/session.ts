import { SESSION_COOKIE } from '$env/static/private';
import type { Cookies } from '@sveltejs/kit';

const path = '/';

export const createSession = (cookies: Cookies, bkey: string) => {
	cookies.set(SESSION_COOKIE, bkey, {
		path,
		httpOnly: true,
		sameSite: 'lax',
		secure: process.env.NODE_ENV === 'production',
		maxAge: 60 * 60 * 24 * 7 // 7 days
	});
};

export const getSession = (cookies: Cookies) => {
	return cookies.get(SESSION_COOKIE);
};

export const deleteSession = (cookies: Cookies) => {
	cookies.delete(SESSION_COOKIE, { path });
};
