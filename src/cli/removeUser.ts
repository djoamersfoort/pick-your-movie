import { Command } from 'commander';
import { db } from './db';
import { userTable } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

export default new Command('removeuser')
	.description('remove a user')
	.argument('<name>', 'full name')
	.action(async (name: string) => {
		const res = await db.delete(userTable).where(eq(userTable.name, name));
		console.log(`deleted ${res.changes} user(s)`);
	});
