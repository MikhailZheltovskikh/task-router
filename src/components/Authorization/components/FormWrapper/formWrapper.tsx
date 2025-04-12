import './formWrapper.scss';
import React from 'react';

type IFormWrapperProps = {
	children: React.ReactNode;
};

export const FormWrapper: React.FC<IFormWrapperProps> = ({ children }) => {
	return <div className="form-wrapper">{children}</div>;
};
