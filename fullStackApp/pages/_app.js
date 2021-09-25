import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../components/header';
import { Fragment } from 'react';
import { Provider } from 'react-redux';
import withRedux from 'next-redux-wrapper';
import withReduxSaga from 'next-redux-saga';
import configureStore from '../configure-store';

function App({ Component, pageProps, store }) {
	return (
			<Provider store={store}>
				<Fragment>
					<Header />
					<Component {...pageProps} />
					<style global jsx>
						{`
							body {
								background-color: black;
								color: white;
							}
						`}
					</style>
				</Fragment>
			</Provider>
	);
}

App.getInitialProps = async ({ Component, ctx }) => {
	console.log('alexa','get init');
	
	let pageProps = {};

	if (Component.getInitialProps) {
		pageProps = await Component.getInitialProps(ctx);
	}

	return { pageProps };
};

export default withRedux(configureStore)(withReduxSaga(App));
