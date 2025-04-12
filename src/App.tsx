import { Route, Routes } from 'react-router-dom';
import { Home, Category, Info, NotFound, Categories } from './pages';
import { Authorization, Header } from './components';
import React from 'react';
import { AuthProvider } from './context/AuthProvider';
import { PrivateRoute } from './components/PrivateRoute/PrivateRoute';

export const App: React.FC = () => (
	<div className="container">
		<AuthProvider>
			<Header />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route
					path="/categories"
					element={
						<PrivateRoute>
							<Categories />
						</PrivateRoute>
					}
				>
					<Route path=":category" element={<Category />} />
					<Route path=":category/:id" element={<Info />} />
				</Route>
				<Route path="*" element={<NotFound />} />
				<Route path="/login" element={<Authorization />} />
			</Routes>
		</AuthProvider>
	</div>
);
