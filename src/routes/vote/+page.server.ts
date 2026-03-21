import { fail, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import {
	deleteVote,
	getMovieByBkey,
	getOrderedMovies,
	getVotedMovieIds,
	insertVote
} from '$lib/server/vote/queries';
import { getMaxVotes } from '$lib/server/env';
import { toLogin } from '$lib/server/redirect';
import type { VoteMovie } from '$lib/server/vote/types';

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.user) throw toLogin();

	const movieData = await getOrderedMovies();
	const voteData = await getVotedMovieIds(locals.user.id);

	const age = locals.user.age;
	const movies = movieData.map<VoteMovie>((movie) => ({
		...movie,
		voted: voteData.includes(movie.id),
		appropriate: !movie.ageRating || age >= movie.ageRating
	}));

	return {
		user: locals.user,
		maxVotes: getMaxVotes(),
		voteCount: voteData.length,
		movies
	};
};

const getMovie = async (request: Request) => {
	const formData = await request.formData();
	const movieBkey = formData.get('movieId');
	if (typeof movieBkey !== 'string') return null;
	return await getMovieByBkey(movieBkey);
};

export const actions: Actions = {
	register: async ({ request, locals }) => {
		if (!locals.user) throw toLogin();

		const movie = await getMovie(request);
		if (!movie) return fail(400, { error: 'That movie does not exist.' });

		if (movie.ageRating && movie.ageRating > locals.user.age)
			return fail(401, { error: 'You are too young!' });

		const votes = await getVotedMovieIds(locals.user.id);
		if (votes.length >= getMaxVotes())
			return fail(400, { error: 'You have reached your maximum votes.' });
		if (votes.includes(movie.id))
			return fail(400, { error: 'You have already voted for that movie.' });

		await insertVote(locals.user.id, movie.id);
	},
	deregister: async ({ request, locals }) => {
		if (!locals.user) throw toLogin();

		const movie = await getMovie(request);
		if (!movie) return fail(400, { error: 'That movie does not exist.' });

		await deleteVote(locals.user.id, movie.id);
	}
};
