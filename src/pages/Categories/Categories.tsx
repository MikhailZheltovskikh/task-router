import { NavLink, Outlet } from 'react-router-dom';
import React, { Suspense } from 'react';
import './Categories.scss';

export const Categories: React.FC = () => {
	return (
		<div className="wrapper">
			<ul className="categories-list">
				<li>
					<NavLink to="character">Герои</NavLink>
				</li>
				<li>
					<NavLink to="location">Локации</NavLink>
				</li>
				<li>
					<NavLink to="episode">Эпизоды</NavLink>
				</li>
			</ul>
			<Suspense fallback={<h1>Loading...</h1>}>
				<Outlet />
			</Suspense>
		</div>
	);
};
