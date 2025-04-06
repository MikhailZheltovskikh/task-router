import { useNavigate } from 'react-router-dom';
import { formatDate } from '../helpers';

export const LocationItem = ({ data }) => {
	const navigate = useNavigate();

	return (
		<>
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
		</>
	);
};
