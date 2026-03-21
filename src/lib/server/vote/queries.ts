import { db } from '$lib/server/db';
import { movieTable, voteTable } from '$lib/server/db/schema';
import { and, desc, eq } from 'drizzle-orm';

export const getOrderedMovies = () => {
	return db.select().from(movieTable).orderBy(desc(movieTable.score));
};

export const getMovieByBkey = async (movieBkey: string) => {
	const movies = await db.select().from(movieTable).where(eq(movieTable.bkey, movieBkey));
	return movies.at(0) ?? null;
};

export const getVotedMovieIds = async (userId: number) => {
	const res = await db
		.select({ id: movieTable.id })
		.from(voteTable)
		.innerJoin(movieTable, eq(voteTable.movieId, movieTable.id))
		.where(eq(voteTable.userId, userId));

	return res.map(({ id }) => id);
};

export const insertVote = (userId: number, movieId: number) => {
	return db.insert(voteTable).values({ userId, movieId });
};

export const deleteVote = (userId: number, movieId: number) => {
	return db
		.delete(voteTable)
		.where(and(eq(voteTable.userId, userId), eq(voteTable.movieId, movieId)));
};
