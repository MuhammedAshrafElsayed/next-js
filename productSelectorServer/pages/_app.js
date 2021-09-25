// import App from 'next/app'
// import cssStyle from "static/css"
import { Fragment } from 'react';

function MyApp({ Component, pageProps }) {
	return (
		<Fragment>
			<Component {...pageProps} />
            {/* <style global jsx>
				{`html{height:100%}body{min-height:100%;margin:0;overflow-x:hidden;padding:0!important}}`}
			</style> */}
		</Fragment>
	);
}

export default MyApp;
