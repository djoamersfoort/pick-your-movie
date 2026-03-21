import { Command } from 'commander';
import { db } from './db';
import { movieTable, type InsertMovie } from '$lib/server/db/schema';
import fs from 'fs/promises';

export default new Command('addmovies')
	.description('add a list of movies')
	.argument('<path>', 'path to movies json file')
	.action(async (path: string) => {
		const file = await fs.readFile(path, 'utf8');
		const data = JSON.parse(file) as InsertMovie[];
		const res = await db.insert(movieTable).values(data).onConflictDoNothing();
		console.log(`added ${res.changes} movie(s)`);
	});
