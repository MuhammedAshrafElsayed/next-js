import { useEffect, useMemo, useState, Fragment } from 'react';
import dynamic from 'next/dynamic';
import useSWR from 'swr';

function fetch() {
	return {
		Main: dynamic(() => import('cit-sog-react'), { loading: () => <p>loading...</p> })
	};
}
function App() {
	const { data, error } = useSWR('/listing/[pageType]', fetch);

	if (error) return <div>failed to load</div>;
	if (!data) return null;
	return (
		<data.Main>
			<style global jsx>
				{`html{height:100%}body{min-height:100%;margin:0;overflow-x:hidden;padding:0!important}}`}
			</style>
		</data.Main>
	);
}

export default App;
