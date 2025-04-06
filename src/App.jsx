import { Route, Routes } from 'react-router-dom';
import { Home, Category, Info, NotFound } from './pages';
import { Navigation } from './components';

export const App = () => (
	<div className="container">
		<Navigation />
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/categories/:name" element={<Category />} />
			<Route path="/categories/:name/:id" element={<Info />} />
			<Route path="*" element={<NotFound />} />
		</Routes>
	</div>
);
