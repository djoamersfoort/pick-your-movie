import { getDB } from '$lib/server/db';
import { movieTable, voteTable } from '$lib/server/db/schema';
import { and, count, desc, eq, getTableColumns } from 'drizzle-orm';

export const getOrderedMovies = () => {
	return getDB().select().from(movieTable).orderBy(desc(movieTable.score));
};

export const getVotedMovies = async () => {
	return getDB()
		.select({
			...getTableColumns(movieTable),
			votes: count(voteTable.id)
		})
		.from(movieTable)
		.innerJoin(voteTable, eq(voteTable.movieId, movieTable.id))
		.groupBy(movieTable.id)
		.orderBy(desc(count(voteTable.id)));
};

export const getMovieByBkey = async (movieBkey: string) => {
	const movies = await getDB().select().from(movieTable).where(eq(movieTable.bkey, movieBkey));
	return movies.at(0) ?? null;
};

export const getVotedMovieIds = async (userId: number) => {
	const res = await getDB()
		.select({ id: movieTable.id })
		.from(voteTable)
		.innerJoin(movieTable, eq(voteTable.movieId, movieTable.id))
		.where(eq(voteTable.userId, userId));

	return res.map(({ id }) => id);
};

export const insertVote = (userId: number, movieId: number) => {
	return getDB().insert(voteTable).values({ userId, movieId });
};

export const deleteVote = (userId: number, movieId: number) => {
	return getDB()
		.delete(voteTable)
		.where(and(eq(voteTable.userId, userId), eq(voteTable.movieId, movieId)));
};
