import { useCallback, useEffect, useRef, useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import React from 'react';
import './Category.scss';
import type { ICharacter, ILocation, IEpisode } from '../../types';
import { useInfinityScroll } from '../../hooks/useInfinityScroll';

type SortType = 'asc' | 'desc';

type CategoryType = 'characters' | 'location' | 'episode';

type CategoryData = ICharacter | ILocation | IEpisode;

export const Category: React.FC = () => {
	const { category } = useParams<{ category: CategoryType }>();
	const [searchParams, setSearchParams] = useSearchParams({ _sort: '' });
	const sort = searchParams.get('_sort') as SortType | null;

	const { data, setData, isLoading, error, hasMore, setPageNumber } = useInfinityScroll(
		category
	);

	const observer = useRef<IntersectionObserver | null>(null);
	const lastNodeRef = useCallback(
		(node) => {
			if (isLoading) return;
			if (observer.current) {
				observer.current.disconnect();
			}

			observer.current = new IntersectionObserver((entries) => {
				if (entries[0].isIntersecting && hasMore) {
					setPageNumber((prev) => prev + 1);
				}
			});

			if (node) {
				observer.current.observe(node);
			}
		},
		[isLoading, hasMore],
	);

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
				return;
		}
	};

	if (error) {
		return <h1>Ошибка загрузки данных</h1>;
	}

	return (
		<div className="category">
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
					{data.map((item, index) => {
						if (data.length === index + 1) {
							return (
								<li
									ref={lastNodeRef}
									className="category-item"
									key={item.id}
								>
									{'image' in item && <img src={item.image} alt="" />}
									<Link to={`${item.id}`} state={{ itemData: item }}>
										{item.name}
									</Link>
								</li>
							);
						} else {
							return (
								<li className="category-item" key={item.id}>
									{'image' in item && <img src={item.image} alt="" />}
									<Link to={`${item.id}`} state={{ itemData: item }}>
										{item.name}
									</Link>
								</li>
							);
						}
					})}
					{isLoading && <h4>Идет загрузка данных</h4>}
				</ul>
			</>
		</div>
	);
};
