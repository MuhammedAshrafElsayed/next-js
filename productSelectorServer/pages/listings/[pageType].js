import { useEffect, useMemo, useState, Fragment } from 'react';
import dynamic from 'next/dynamic';
import useSWR from 'swr';

function fetch() {
	console.log('alexa', 'fetch is fetching');

	return {
		Main: dynamic(() => import('cit-sog-react'), { loading: () => <p>loading...</p> })
	};
}
// const Main = dynamic(() => import('cit-sog-react'), { loading: () => <p>loading...</p> });
function App({ Main }) {
	const { data, error } = useSWR('/listing/[pageType]', fetch);
	console.log('alexa', 'swr', data, error);

	if (error) return <div>failed to load</div>;
	if (!data) return <div>loading...</div>;
	//   return <div>hello {data.name}!</div>
	// return <Fragment> {data.Main}</Fragment>;
	return (
		<data.Main>
			<style global jsx>
				{`html{height:100%}body{min-height:100%;margin:0;overflow-x:hidden;padding:0!important}}`}
			</style>
		</data.Main>
	);
}

// export async function getStaticPaths() {
// 	return {
// 	  paths: [
// 		{ params: { pageType:"handsets" } }
// 	  ],
// 	  fallback: false
// 	};
//   }

// export async function getStaticProps() {
// 	return {
// 		props: {
// 			Main: dynamic(() => import('cit-sog-react'), { loading: () => <p>loading...</p> })
// 		}
// 	};
// }

export default App;
