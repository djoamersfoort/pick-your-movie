export const getAgeColor = (age: number | null) => {
	if (!age) return null;

	if (age >= 18) return 'text-zinc-500';
	if (age >= 16) return 'text-red-500';
	if (age >= 14) return 'text-orange-500';
	if (age >= 12) return 'text-amber-500';
	if (age >= 9) return 'text-yellow-500';
	return 'text-emerald-500';
};
