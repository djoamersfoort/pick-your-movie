import { getVotedMovies } from '$lib/server/vote/queries';
import type { StatMovie } from '$lib/server/vote/types';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const movies: StatMovie[] = await getVotedMovies();
	return { movies };
};
