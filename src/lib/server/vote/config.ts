import { MAX_VOTES } from '$env/static/private';

const maxVotes = Number.parseInt(MAX_VOTES);

if (Number.isNaN(maxVotes)) throw new Error('Please define max votes.');

export { maxVotes };
