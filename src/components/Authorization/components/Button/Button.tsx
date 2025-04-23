import './button.scss';
import React from 'react';

type IButtonProps = {
	children: React.ReactNode;
	type: 'submit';
	size: string;
	radius: string;
};

export const Button: React.FC<IButtonProps> = ({ children, type, size, radius }) => {
	return (
		<button type={type} className={`button size-${size} border-radius-${radius}`}>
			{children}
		</button>
	);
};
