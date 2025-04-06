import { useLocation, useParams } from 'react-router-dom';
import { CharactersItem, EpisodeItem, LocationItem } from '../components';

export const Info = () => {
	const { name } = useParams();
	const location = useLocation();
	const itemData = location.state?.itemData;

	const typeItem = (type) => {
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
