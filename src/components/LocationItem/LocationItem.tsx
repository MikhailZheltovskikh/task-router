import { useNavigate } from 'react-router-dom';
import { formatDate } from '../../utils';
import React from 'react';
import { ILocation } from '../../types';

type ILocationItemProps = {
	data: ILocation;
};

export const LocationItem: React.FC<ILocationItemProps> = ({ data }) => {
	const navigate = useNavigate();

	return (
		<div>
			<h1>{data.name}</h1>

			<div className="item">
				<div>
					<span>Название:</span>
					{data.name}
				</div>
				<div>
					<span>Тип:</span>
					{data.type}
				</div>
				<div>
					<span>Измерение:</span>
					{data.dimension}
				</div>
				<div>
					<span>Дата:</span>
					{formatDate(data.created)}
				</div>
			</div>

			<button className="button" onClick={() => navigate(-1)}>
				Назад
			</button>
		</div>
	);
};
