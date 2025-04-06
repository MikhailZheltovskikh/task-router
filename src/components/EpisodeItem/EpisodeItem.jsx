import { useNavigate } from 'react-router-dom';
import { formatDate } from '../helpers';

export const EpisodeItem = ({ data }) => {
	const navigate = useNavigate();

	return (
		<>
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
		</>
	);
};
