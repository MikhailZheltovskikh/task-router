import { useParams } from 'react-router-dom';
import { CharactersItem, EpisodeItem, LocationItem } from '../../components';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

export const Info: React.FC = () => {
	const { category, id } = useParams();
	const [itemData, setItemData] = useState();
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(false);

	useEffect(() => {
		const fetchData = async () => {
			if (!category || !id) return;

			setIsLoading(true);
			setError(false);

			try {
				const response = await axios({
					method: 'GET',
					url: `https://rickandmortyapi.com/api/${category}/${id}`,
				});

				const data = await response.data;
				setItemData(data);
			} catch (err) {
				setError(true);
			} finally {
				setIsLoading(false);
			}
		};

		fetchData();
	}, [category, id]);

	const typeItem = (type: string | undefined) => {
		if (isLoading) {
			return <h1>Loading...</h1>;
		}

		if (error) {
			return <h1>Ошибка загрузки данных</h1>;
		}

		if (!itemData) {
			return <h1>Данные не найдены</h1>;
		}

		switch (type) {
			case 'character':
				return <CharactersItem data={itemData} />;
			case 'location':
				return <LocationItem data={itemData} />;
			case 'episode':
				return <EpisodeItem data={itemData} />;

			default:
				return <div>Неизвестная ошибка</div>;
		}
	};

	return <>{typeItem(category)}</>;
};
