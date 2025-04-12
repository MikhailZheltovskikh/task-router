import { useLocation, useParams } from 'react-router-dom';
import { CharactersItem, EpisodeItem, LocationItem } from '../components';
import React, { useEffect, useState } from 'react';
import { URL_MOCK } from '../constants';

export const Info: React.FC = () => {
	const { category, id } = useParams();
	const location = useLocation();
	const [itemData, setItemData] = useState(location.state?.itemData || null);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(false);

	useEffect(() => {
		if (location.state?.itemData) {
			return;
		}

		const fetchData = async () => {
			if (!category || !id) return;

			setIsLoading(true);
			setError(false);

			try {
				const response = await fetch(`${URL_MOCK}/${category}.json`);
				const data = await response.json();

				const item = data.find((item) => item.id === Number(id));
				if (item) {
					setItemData(item);
				}
			} catch (err) {
				setError(true);
			} finally {
				setIsLoading(false);
			}
		};

		fetchData();
	}, [category, id, location.state]);

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
			case 'characters':
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
