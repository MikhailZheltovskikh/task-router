import './textInput.scss';
import React from 'react';

type ITextInputProps = {
	label: string;
	size: string;
	required: boolean;
	type: string;
	placeholder: string;
	error: string;
	name: string;
	radius: string;
	icon: string;
	defaultValue: string;
};

export const TextInput: React.FC<ITextInputProps> = ({
	label,
	size,
	required,
	type,
	placeholder,
	error,
	name,
	radius,
	icon,
	...props
}) => {
	console.log(" error:", error)
	return (
		<div className={`textInput size-${size}`}>
			<div className="textInput-box">
				<div className="textInput-name">{label}</div>
				{required && <div className="required">*</div>}
			</div>
			<label
				className={`textInput-label ${icon && 'icon'}`}
				data-icon={icon && icon}
			>
				<input
					type={type}
					name={name}
					className={`textInput-input size-${size} border-radius-${radius}`}
					placeholder={placeholder}
					required={required}
					{...props}
				/>
			</label>
			<div className="textInput-error">{error}</div>
		</div>
	);
};
