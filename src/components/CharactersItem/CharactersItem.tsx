import React from 'react';
import { useNavigate } from 'react-router-dom';
import './CharactersItem.scss';
import { formatDate } from '../../utils';
import { ICharacter } from '../../types';

type ICharactersItemProps = {
	data: ICharacter;
};

export const CharactersItem: React.FC<ICharactersItemProps> = ({ data }) => {
	const navigate = useNavigate();

	return (
		<div>
			<h1>{data.name}</h1>

			<div className="item">
				<div className="item-image">
					<img src={data.image} alt="" />
				</div>

				<div>
					<span>Имя:</span>
					{data.name}
				</div>
				<div>
					<span>Статус:</span>
					{data.status}
				</div>
				<div>
					<span>Вид:</span>
					{data.species}
				</div>
				<div>
					<span>Пол:</span>
					{data.gender}
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
