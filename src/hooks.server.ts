import { eq } from 'drizzle-orm';
import { getDB } from '$lib/server/db';
import { userTable } from '$lib/server/db/schema';
import { getSession } from '$lib/server/session';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	const userId = getSession(event.cookies);

	if (userId) {
		const res = await getDB().select().from(userTable).where(eq(userTable.bkey, userId));
		event.locals.user = res.at(0) ?? null;
	} else {
		event.locals.user = null;
	}

	return resolve(event);
};
