import { env } from '$env/dynamic/private';

let maxVotes: number | undefined;

export const getMaxVotes = () => {
	if (maxVotes !== undefined) return maxVotes;

	if (!env.MAX_VOTES) throw new Error('MAX_VOTES is not set');

	maxVotes = Number.parseInt(env.MAX_VOTES);
	if (Number.isNaN(maxVotes)) throw new Error('MAX_VOTES is not a number');

	return maxVotes;
};

let databaseUrl: string | undefined;

export const getDatabaseURL = () => {
	if (databaseUrl !== undefined) return databaseUrl;

	if (!env.DATABASE_URL) throw new Error('DATABASE_URL is not set');
	databaseUrl = env.DATABASE_URL;

	return databaseUrl;
};
