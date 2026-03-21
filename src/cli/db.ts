import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import * as schema from '$lib/server/db/schema';
import { loadEnv } from 'vite';

const env = loadEnv('development', process.cwd(), '');

if (!env.DATABASE_URL) throw new Error('DATABASE_URL is not set');
const client = new Database(env.DATABASE_URL);

export const db = drizzle(client, { schema });
