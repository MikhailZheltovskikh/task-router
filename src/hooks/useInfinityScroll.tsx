import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { ICharacter, IEpisode, ILocation } from '../types';
import { URL_API } from '../constants';

type CategoryData = ICharacter | ILocation | IEpisode;

export const useInfinityScroll = (category: string | undefined) => {
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [error, setError] = useState<boolean>(false);
	const [hasMore, setHasMore] = useState<boolean>(false);
	const [data, setData] = useState<CategoryData[]>([]);
	const [pageNumber, setPageNumber] = useState<number>(1);

	useEffect(() => {
		setData([]);
		setPageNumber(1)
	}, [category]);

	useEffect(() => {
		setIsLoading(true);
		setError(false);
		let cancel;

		axios({
			method: 'GET',
			url: `${URL_API}/${category}`,
			params: { page: pageNumber },
			cancelToken: new axios.CancelToken((c) => (cancel = c)),
		})
			.then((res) => {
				const newData = res.data.results.map((item) => ({
					id: item.id,
					name: item.name,
					...(category === 'character' && { image: item.image }),
				}));

				setData((prev) => [...prev, ...newData]);
				setHasMore(res.data.info.pages > pageNumber);
			})
			.catch((error) => {
				if (axios.isCancel(error)) return;
				console.log('error:', error.message);
				setError(true);
			})
			.finally(() => {
				setIsLoading(false);
			});

		return () => cancel();
	}, [category, pageNumber]);

	return { data, setData, isLoading, error, hasMore, setPageNumber };
};
