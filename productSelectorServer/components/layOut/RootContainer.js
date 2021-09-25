import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from 'react-redux';
import usePrevious from '../../utils/customHooks/usePrevious';
import { updateIntl } from 'react-intl-redux'
import { Grid } from '@material-ui/core';
import EmptyPage from '../../components/common/EmptyPage.component';
import Spinner from '../../components/common/spinners/Spinner';
import withWidth, { isWidthDown } from '@material-ui/core/withWidth';
import { setCustomerInternalScoreAction, setNumberOfPurchasedDevicesAction } from "../../actions/userActions";
import { setLang, getConfigsRequest } from "../../actions/config";
import { resetStoreWithNewMSISDN, setScreenSizeAction } from "../../actions/appActions";
import Routes from "../../routes/routes";
import constants from "../../constants/appConstants";
import { ReactComponent as NoDeviceIcon } from '../../assets/svg/warningLg.svg';
const { MOBILE, TABLET, LARGE_SCREEN } = constants.screenSize;

export const defaultLang = process.env.REACT_APP_LANG || 'en';


export const RootContainer = ({ width, numberOfPurchasedDevices, customerInternalScore, syncComparisonBadge, msisdn }) => {
	const dispatch = useDispatch();
	
	//  state selectors
	const clientMSISDN = useSelector(({ user }) => user.clientMSISDN);
	const numberOfAddedToBasketItems = useSelector(({ basket }) => basket.count);
	const { lang, translation, config, isFetchingConfig, isFetchingTranslation } = useSelector(({ appConfig }) => appConfig);
	
	const isConfigLoaded = Boolean(Object.keys(config).length);
	const navigation = config?.navigation;
	const selectedLang = lang || defaultLang;


	// Reset store if passed different MSISDN
	useEffect(() => {
		if (clientMSISDN !== msisdn) {
			dispatch(resetStoreWithNewMSISDN(msisdn));
		}
	}, [msisdn, clientMSISDN, dispatch]);

	//set current language in store and fetch translations (if necessary)
	const prevLang = usePrevious(selectedLang);
	useEffect(() => {
		if (prevLang !== selectedLang && !isFetchingTranslation) {
		 dispatch(setLang(selectedLang));}
	}, []);

	//update intl instance
	useEffect(() => {
		if (translation[selectedLang]) {
			dispatch(updateIntl({ locale: selectedLang, messages: translation[selectedLang] }));
		}
	}, [translation, selectedLang, dispatch]);


	// Request config file
	useEffect(() => {
		if(Object.keys(config).length < 1 && !isFetchingConfig)
		dispatch(getConfigsRequest());
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);


	/** Set screen size in store */
	useEffect(() => {
		if (isWidthDown('xs', width)) dispatch(setScreenSizeAction(MOBILE));
		else if (isWidthDown('xl', width)) dispatch(setScreenSizeAction(TABLET));
		else dispatch(setScreenSizeAction(LARGE_SCREEN));
	}, [width, dispatch]);


	//Initialize customer internal score
	useEffect(() => {
		if (customerInternalScore && customerInternalScore.min > -1 && customerInternalScore.max > -1) {
			dispatch(setCustomerInternalScoreAction({ ...customerInternalScore, isSwitchEnabled: true }));
		}
	}, [customerInternalScore, dispatch]);

	//Initialize number of purchased devices
	useEffect(() => {
		numberOfPurchasedDevices &&
			dispatch(setNumberOfPurchasedDevicesAction(numberOfPurchasedDevices));
	}, [numberOfPurchasedDevices, dispatch]);

	//Synchronize number of added-to-comparison items with Angular app
	useEffect(() => {
		if (typeof syncComparisonBadge === "function") {
			syncComparisonBadge(numberOfAddedToBasketItems);
		}
	}, [numberOfAddedToBasketItems, syncComparisonBadge]);



	if (isConfigLoaded && (!navigation || !config.listingPageConfig)) {
		return (
			<Grid container alignItems='center' style={{ height: '100vh', padding: '0 5vw' }}>
				<EmptyPage 
					IconComponent={NoDeviceIcon} 
					titleTranslationId='productDetails.empty'
          			subTitleTranslationId='productDetails.emptyMessage'
					buttonTranslationId='app.APIErrorPopup.retry' />
			</Grid>
		)
	} else if (isConfigLoaded && navigation) {
		return <Routes navigation={navigation} />;
	}


	return (
		<Grid container alignItems='center' style={{ height: '100vh' }}>
			<Spinner id='productListingPageSpinner' />
		</Grid>
	);
};

RootContainer.propTypes = {
	width: PropTypes.string.isRequired,	//screen size returned using withWidth HOC
	numberOfPurchasedDevices: PropTypes.number,
	customerInternalScore: PropTypes.shape({
		min: PropTypes.number,
		max: PropTypes.number
	}),
	syncComparisonBadge: PropTypes.func,
	msisdn: PropTypes.string,
};

export default withWidth()(React.memo(RootContainer));