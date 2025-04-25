import React, { useTransition } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './Header.scss';
import { useAuth } from '../../context/AuthProvider';
import { USERS } from '../../constants';

export const Header: React.FC = () => {
	const [isPending, startTransition] = useTransition();

	const auth = useAuth();
	const navigate = useNavigate();

	const UserName = (user: string) => {
		const userItem = USERS.find((item) => item.email === user);
		if (userItem) {
			return userItem.name;
		}
	};

	const handleClickSignOut = () => {
		startTransition(() => {
			auth.signout();
			navigate('/', { replace: true });
		});
	};

	return (
		<div className="header-wrapper">
			<h1>Рик и Морти</h1>
			<ul className="header-menu">
				<li>
					<NavLink to="/">Главная</NavLink>
				</li>
				<li>
					<NavLink to="/categories">Категории</NavLink>
				</li>
				<li>
					{!auth.user && <NavLink to="/login">Войти</NavLink>}
					{auth.user && (
						<>
							<span>{UserName(auth.user.email)}</span>
							<button onClick={handleClickSignOut}> Выйти </button>
						</>
					)}
				</li>
			</ul>
		</div>
	);
};
