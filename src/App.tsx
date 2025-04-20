import { Route, Routes } from 'react-router-dom';
import { Authorization, Header } from './components';
import React, { lazy } from 'react';
import { AuthProvider } from './context/AuthProvider';
import { PrivateRoute } from './components/PrivateRoute/PrivateRoute';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';

const Home = lazy(() =>
	import('./pages/Home').then((module) => ({ default: module.Home })),
);

const Category = lazy(() =>
	import('./pages/Category/Category').then((module) => ({
		default: module.Category,
	})),
);

const Info = lazy(() =>
	import('./pages/Info').then((module) => ({
		default: module.Info,
	})),
);

const NotFound = lazy(() =>
	import('./pages/NotFound').then((module) => ({
		default: module.NotFound,
	})),
);

const Categories = lazy(() =>
	import('./pages/Categories/Categories').then((module) => ({
		default: module.Categories,
	})),
);

export const App: React.FC = () => (
	<div className="container">
		<ErrorBoundary>
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
		</ErrorBoundary>
	</div>
);
