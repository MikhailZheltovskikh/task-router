import { useLocation, useParams } from 'react-router-dom';
import { CharactersItem, EpisodeItem, LocationItem } from '../components';
import React from 'react';

export const Info: React.FC = () => {
	const { name } = useParams();
	const location = useLocation();
	const itemData = location.state?.itemData;

	const typeItem = (type: string | undefined) => {
		switch (type) {
			case 'characters':
				return <CharactersItem data={itemData} />;
			case 'location':
				return <LocationItem data={itemData} />;
			case 'episode':
				return <EpisodeItem data={itemData} />;

			default:
				break;
		}
	};

	return <>{typeItem(name)}</>;
};
