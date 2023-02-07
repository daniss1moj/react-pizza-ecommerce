import './scss/app.scss';
import Header from './components/Header';
import MainPage from './pages/MainPage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Loadable from 'react-loadable';
import React from 'react';
const Cart = Loadable({
	loader: () => import ( /* webpackChunkName: "Cart" */ './pages/Cart'),
	loading: () => <div>Loading...</div>,
  });
// const Cart = React.lazy(() => import ( /* webpackChunkName: "Cart" */ './pages/Cart'))
const PizzaPage = React.lazy(() => import (/* webpackChunkName: "PizzaPage" */ './pages/PizzaPage'))
const NotFound = React.lazy(() => import ( /* webpackChunkName: "NotFound" */ './pages/NotFound'))
function App() {


	return (
		<Router>
			<div className="wrapper">
				<Header />
				<div className="content">
				<React.Suspense fallback={<div>Loading...</div>}>
					<Routes>
						<Route path="/" element={<MainPage />} />
						<Route path="pizzas/:id" element={<PizzaPage />} />
						<Route path="/cart" element={<Cart />} />
						<Route path="*" element={<NotFound />} />
					</Routes>
				</React.Suspense>
				</div>
			</div>
		</Router>
	);
}

export default App;
