import { Command } from 'commander';
import { db } from './db';
import { userTable, type InsertUser } from '$lib/server/db/schema';
import fs from 'fs/promises';

export default new Command('addusers')
	.description('add a list of users')
	.argument('<path>', 'path to users json file')
	.action(async (path: string) => {
		const file = await fs.readFile(path, 'utf8');
		const data = JSON.parse(file) as InsertUser[];
		const res = await db.insert(userTable).values(data).onConflictDoNothing();
		console.log(`added ${res.changes} user(s)`);
	});
