import { useEffect, useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { URL_MOCK } from '../../constants';
import React from 'react';
import './Category.scss';
import type { ICharacter, ILocation, IEpisode } from '../../types';

type SortType = 'asc' | 'desc';

type CategoryType = 'characters' | 'location' | 'episode';

type CategoryData = ICharacter | ILocation | IEpisode;

export const Category: React.FC = () => {
	const { category } = useParams<{ category: CategoryType }>();
	const [data, setData] = useState<CategoryData[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [error, setError] = useState<boolean>(false);
	const [searchParams, setSearchParams] = useSearchParams({ _sort: '' });
	const sort = searchParams.get('_sort') as SortType | null;

	useEffect(() => {
		(async () => {
			try {
				setIsLoading(true);
				setError(false);

				const response = await fetch(`${URL_MOCK}/${category}.json`);
				const jsonData = await response.json();

				if (sort) {
					sortFunc(sort, jsonData);
				} else {
					setData(jsonData);
				}
			} catch (error) {
				setError(error && true);
			} finally {
				setIsLoading(false);
			}
		})();
	}, [category, sort]);

	const handlechange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const { value } = e.target;

		if (value == 'none') {
			return;
		}
		setSearchParams({ _sort: value });
		sortFunc(value as SortType, data);
	};

	const sortFunc = (value: SortType, items: CategoryData[]) => {
		switch (value) {
			case 'asc':
				setData([...items].sort((a, b) => a.name.localeCompare(b.name)));
				break;
			case 'desc':
				setData([...items].sort((a, b) => b.name.localeCompare(a.name)));
				break;
			default:
				break;
		}
	};

	if (error) {
		return <h1>Ошибка загрузки данных</h1>;
	}

	return (
		<div className="category">
			{isLoading ? (
				<h1>Loading...</h1>
			) : (
				<>
					<div className="sort">
						<div className="sort-title">Сортировка</div>
						<select
							className="sort-list"
							onChange={handlechange}
							value={sort || 'none'}
						>
							<option value="none" disabled>
								None
							</option>
							<option value="asc">A-Z</option>
							<option value="desc">Z-A</option>
						</select>
					</div>

					<ul className="category-list">
						{data.map((item) => (
							<li className="category-item" key={item.id}>
								{'image' in item && <img src={item.image} alt="" />}
								<Link to={`${item.id}`} state={{ itemData: item }}>
									{item.name}
								</Link>
							</li>
						))}
					</ul>
				</>
			)}
		</div>
	);
};
