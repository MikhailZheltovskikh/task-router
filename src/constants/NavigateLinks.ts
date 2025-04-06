type INavigateLink = {
	link: string;
	title: string;
}

export const NavigateLinks: INavigateLink[] = [
	{
		title: 'Персонажи',
		link: '/categories/characters',
	},
	{
		title: 'Локации',
		link: '/categories/location',
	},
	{
		title: 'Эпизоды',
		link: '/categories/episode',
	},
];
