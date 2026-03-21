import type { Movie } from '$lib/server/db/schema';

export type UIMovie = Movie & {
	voted: boolean;
	appropriate: boolean;
};
