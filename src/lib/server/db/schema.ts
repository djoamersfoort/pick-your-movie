import { int, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import type { InferInsertModel, InferSelectModel } from 'drizzle-orm';

export const movieTable = sqliteTable('movie', {
	id: int('id').primaryKey({ autoIncrement: true }),
	bkey: text('bkey')
		.unique()
		.notNull()
		.$defaultFn(() => crypto.randomUUID()),

	title: text('title').notNull(),
	description: text('description').notNull(),
	rating: int('rating').notNull()
});

export type Movie = InferSelectModel<typeof movieTable>;
export type InsertMovie = InferInsertModel<typeof movieTable>;

export const userTable = sqliteTable('user', {
	id: int('id').primaryKey({ autoIncrement: true }),
	bkey: text('bkey')
		.unique()
		.notNull()
		.$defaultFn(() => crypto.randomUUID()),

	name: text('name').notNull(),
	age: int('age').notNull()
});

export type User = InferSelectModel<typeof userTable>;
export type InsertUser = InferInsertModel<typeof userTable>;

export const voteTable = sqliteTable('vote', {
	id: int('id').primaryKey({ autoIncrement: true }),
	bkey: text('bkey')
		.unique()
		.notNull()
		.$defaultFn(() => crypto.randomUUID()),

	movieId: int('movie_id').references(() => movieTable.id),
	userId: int('user_id').references(() => userTable.id)
});

export type Vote = InferSelectModel<typeof voteTable>;
export type InsertVote = InferInsertModel<typeof voteTable>;
