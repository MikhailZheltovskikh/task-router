import { useEffect, useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { URL_MOCK } from '../constants';
import React from 'react';

type SortType = 'asc' | 'desc';

type BaseItem = {
	id: number;
	name: string;
};

export const Category: React.FC = () => {
	const { name } = useParams<{ name: string }>();
	const [data, setData] = useState([]);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [error, setError] = useState<boolean>(false);
	const [searchParams, setSearchParams] = useSearchParams({ _sort: '' });
	const sort = searchParams.get('_sort') as SortType | null;

	useEffect(() => {
		(async () => {
			try {
				setIsLoading(true);
				setError(false);

				const response = await fetch(`${URL_MOCK}/${name}.json`);
				const jsonData = await response.json();

				if (sort) {
					sortFunc(sort, jsonData);
				}

				setData(jsonData);
			} catch (error) {
				setError(error && true);
			} finally {
				setIsLoading(false);
			}
		})();
	}, [name, sort]);

	const handlechange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const { value } = e.target;

		if (value == 'none') {
			return;
		}
		setSearchParams({ _sort: value });
		sortFunc(value as SortType, data);
	};

	const sortFunc = (value: SortType, data: BaseItem[]) => {
		switch (value) {
			case 'asc':
				setData(data.sort((a, b) => a.name.localeCompare(b.name)));
				break;
			case 'desc':
				setData(data.sort((a, b) => b.name.localeCompare(a.name)));
				break;
			default:
				break;
		}
	};

	const title = (name: string | undefined) => {
		switch (name) {
			case 'characters':
				return 'Персонажи';

			case 'location':
				return 'Локации';

			case 'episode':
				return 'Эпизоды';

			default:
				break;
		}
	};

	if (error) {
		return <h1>Ошибка загрузки данных</h1>;
	}

	return (
		<div>
			{isLoading ? (
				<h1>Loading...</h1>
			) : (
				<>
					<h1>{title(name)}</h1>
					<div>
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
					</div>
					<ul>
						{data.map((item) => (
							<li key={item.id}>
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
