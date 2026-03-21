import { getDB } from '$lib/server/db';
import { userTable } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

export const getUserByName = async (name: string) => {
	const users = await getDB().select().from(userTable).where(eq(userTable.name, name));
	return users.at(0);
};
