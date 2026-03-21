import type { Movie } from '$lib/server/db/schema';

export type VoteMovie = Movie & {
	voted: boolean;
	appropriate: boolean;
};

export type StatMovie = Movie & {
	votes: number;
};
