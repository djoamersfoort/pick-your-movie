import { Command } from 'commander';
import { db } from './db';
import { movieTable } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

export default new Command('removemovie')
	.description('remove a movie')
	.argument('<title>', 'movie title')
	.action(async (title: string) => {
		const res = await db.delete(movieTable).where(eq(movieTable.title, title));
		console.log(`deleted ${res.changes} movie(s)`);
	});
