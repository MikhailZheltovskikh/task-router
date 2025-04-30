import React, { useState } from 'react';
import { FormWrapper, TextInput, Button } from './components';
import { validateForm } from '../../utils';
import { inputsSingin } from '../../constants';
import { useAuth } from '../../context/AuthProvider';
import { useLocation, useNavigate } from 'react-router-dom';

type FormData = {
	email: string;
	password: string;
};

export const Authorization: React.FC = () => {
	const initialState: FormData = {
		email: '',
		password: '',
	};

	const navigate = useNavigate();
	const location = useLocation();
	const auth = useAuth();

	const from = location.state?.from || '/';

	const [errors, setErrors] = useState<{ [key: string]: string }>({});
	const [formData, setFormData] = useState<FormData>(initialState);

	const handleChange = (e: React.ChangeEvent<HTMLFormElement>) => {
		const { name, value } = e.target;

		setFormData((prevState) => ({
			...prevState,
			[name]: value,
		}));

		const newErrors = validateForm(
			inputsSingin,
			{
				...formData,
				[name]: value,
			},
			true,
		);

		setErrors((prev) => ({
			...prev,
			[name]: newErrors.errors[name] || '',
		}));
	};

	const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
		e.preventDefault();

		auth.signin(formData, () => {
			navigate(from, { replace: true });
		});
	};
	console.log("#####", errors)
	return (
		<FormWrapper>
			<form onSubmit={handleSubmit} onChange={handleChange}>
				{inputsSingin.map((item, index) => (
					<TextInput
						defaultValue={formData[item.name]}
						key={index}
						size="m"
						radius="m"
						error={errors[item.name]}
						{...item}
					/>
				))}

				<Button type="submit" size="m" radius="m">
					Войти
				</Button>
			</form>
		</FormWrapper>
	);
};
