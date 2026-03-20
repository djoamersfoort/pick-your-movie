import { int, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const movie = sqliteTable('movie', {
	id: int('id').primaryKey({ autoIncrement: true }),
	bkey: text('bkey')
		.unique()
		.$defaultFn(() => crypto.randomUUID()),

	title: text('title').notNull(),
	description: text('description').notNull(),
	rating: int('rating').notNull()
});

export const user = sqliteTable('user', {
	id: int('id').primaryKey({ autoIncrement: true }),
	bkey: text('bkey')
		.unique()
		.$defaultFn(() => crypto.randomUUID()),

	name: text('name').notNull(),
	age: int('age').notNull()
});

export const vote = sqliteTable('vote', {
	movieId: int('movie_id').references(() => movie.id),
	userId: int('user_id').references(() => user.id)
});
