import { useEffect, useMemo, useState, Fragment } from 'react';
import dynamic from 'next/dynamic';
import useSWR from 'swr';

function fetch() {
	return import('cit-sog-react');
	return dynamic(
		() =>
			import('cit-sog-react').then((module) => {
				console.log(module);
				return module;
			}),
		{ loading: () => <p>loading...</p> }
	);
	return {
		Main: dynamic(
			() =>
				import('cit-sog-react/index').then((module) => {
					console.log(module);
				}),
			{ loading: () => <p>loading...</p> }
		)
	};
}
function App() {

	const { data, error } = useSWR('/listing/[pageType]', fetch);

	if (error) return <div>failed to load {error.toString()}</div>;
	if (!data) return null;
	const App = data.default;
	const {ListingPage } = data.pages;
	console.log('alexa', 'data', data.pages);
	return <App />;
	return <ListingPage />;
}

export default App;
