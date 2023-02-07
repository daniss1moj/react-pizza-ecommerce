import NotFoundBlock from '../components/NotFoundBlock';
import React from 'react';
import { Link } from 'react-router-dom';
const NotFound: React.FC = () => {
	return (
		<div className="notfound">
			<NotFoundBlock />
			<Link to="/" className="button button--outline">
				Back
			</Link>
		</div>
	);
};

export default NotFound;
