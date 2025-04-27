import { USERS } from '../constants';

const validateEmail = (email: string): boolean => {
	const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return emailPattern.test(email);
};

interface InputField {
	name: string;
	required: boolean;
}

interface FormData {
	[key: string]: string | undefined;
}

interface ValidationErrors {
	[key: string]: string;
}

interface ValidationResult {
	errors: ValidationErrors;
}

export const validateForm = (
	inputs: InputField[],
	formData: FormData,
	isSignIn: boolean = false,
): ValidationResult => {
	let errors: ValidationErrors = {};

	inputs.forEach(({ name, required }) => {
		const value = formData[name];

		if (required && !value) {
			errors[name] = 'Поле не может быть пустым';
		} else if (name === 'email' && !validateEmail(value as string)) {
			errors[name] = 'Некорректный email';
		} else if (name === 'email' && isSignIn) {
			const user = USERS.find((item) => item.email === value);
			if (!user) {
				errors[name] = 'Пользователь не найден';
			}
		} else if (name === 'password' && isSignIn) {
			const user = USERS.find((item) => item.password === value);
			if (!user) {
				errors[name] = 'Неверный пароль';
			}
		}
	});

	return { errors };
};
