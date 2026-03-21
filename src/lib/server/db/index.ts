import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import * as schema from './schema';
import { getDatabaseURL } from '$lib/server/env';

let db: ReturnType<typeof drizzle<typeof schema>> | undefined;

export const getDB = () => {
	if (db !== undefined) return db;

	const client = new Database(getDatabaseURL());
	db = drizzle(client, { schema });

	return db;
};
