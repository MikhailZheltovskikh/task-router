export const getUserFromStorage = () => {
	try {
		const savedUser = localStorage.getItem('user');
		if (!savedUser) return null;
		const parsedUser = JSON.parse(savedUser);

		if (typeof parsedUser === 'string') {
			return {
				email: parsedUser,
				password: parsedUser,
			};
		}
		return parsedUser;
	} catch (error) {
		console.log(error.messege);
	}
};
