import { useNavigate } from 'react-router-dom';
import { formatDate } from '../../utils';
import React from 'react';
import { IEpisode } from '../../types';

type IEpisodeItemProps = {
	data: IEpisode;
};

export const EpisodeItem: React.FC<IEpisodeItemProps> = ({ data }) => {
	const navigate = useNavigate();

	return (
		<div>
			<h1>{data.name}</h1>

			<div className="item">
				<div>
					<span>Серия:</span>
					{data.name}
				</div>
				<div>
					<span>Дата выхода:</span>
					{data.air_date}
				</div>
				<div>
					<span>Номер серии:</span>
					{data.episode}
				</div>
				<div>
					<span>Дата создания:</span>
					{formatDate(data.created)}
				</div>
			</div>

			<button className="button" onClick={() => navigate(-1)}>
				Назад
			</button>
		</div>
	);
};
