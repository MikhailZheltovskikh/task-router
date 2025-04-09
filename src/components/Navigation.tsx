import React from 'react';
import { NavLink } from 'react-router-dom';
import { NavigateLinks } from '../constants';

export const Navigation: React.FC = () => {
	return (
		<>
			<h1>Навигация</h1>
			<ul>
				{NavigateLinks.map((link, index) => (
					<li key={index}>
						<NavLink to={link.link}>{link.title}</NavLink>
					</li>
				))}
			</ul>
		</>
	);
};
