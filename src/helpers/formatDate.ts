export const formatDate = (date: string): string => {
	const newDate = new Date(date);

	const options: Intl.DateTimeFormatOptions = {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	};

	return newDate.toLocaleString('ru-RU', options);
};
