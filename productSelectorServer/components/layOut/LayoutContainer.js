import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import usePrevious from '../../utils/customHooks/usePrevious';
import { Grid, makeStyles } from "@material-ui/core";
import Header from "./Header";
import Footer from "./Footer";
import Spinner from "../../components/common/spinners/Spinner";
import ModalsAndPopupsContainer from "../ModalsAndPopupsContainer/ModalsAndPopupsContainer";
import { hideNudgeAction, hidePopupAction } from "../../actions/appActions";
import Navbar from './Navbar/Navbar';
import OutsideAlerter from "../../components/common/OutsideAlerter"

const useStyles = makeStyles({
	rootContainer: {
		padding: 0,
		backgroundColor: "#f2f2f2",
		position: "relative"
	},
	layoutContainer: {
		minHeight: "calc(100vh - 71px - 106px)",    //page height is 100vh minus header & footer heights
		backgroundColor: "#f2f2f2",
		padding: "27px 11px 21px 11px"
	},
	//layoutContainerForEmbeddedApp is for layout style in case our app is embedded in another host app (SOT for example)
	layoutContainerForEmbeddedApp: {
		minHeight: "calc(100vh - 40px - 106px)",	//page height is 100vh minus header & footer heights
		backgroundColor: "#f2f2f2",
		padding: "27px 11px 21px 11px"
	},
	pageContainer: {
		backgroundColor: "#f2f2f2"
	},
	toolbarFooter: {
		height: "100%",
		padding: "0 22px"
	}
});

export const LayoutContainer = ({ 
	component: Component, 
	componentProps,
	route,
	path,
	screenSize,
    isStandAloneApp,
	hasConfig,
	hasTranslation,
	isFetchingConfig,
    isFetchingTranslation,
    hideNudgeAction,
    hidePopupAction,
    termsAndConditionUrl
}) => {
	const classes = useStyles();
	const [shouldHide, setShouldHide] = useState(false);
    //Hide Nudge & Popup and scroll to top on navigation
	const prevPath = usePrevious(window.location.href);
	
    useEffect(() => {
		if(prevPath && window.location.href !== prevPath) {
			hideNudgeAction();
			hidePopupAction();
			window.scrollTo(0, 0);
		}
    }, [hideNudgeAction, hidePopupAction, path, prevPath]);


	if(!(hasConfig && hasTranslation)) return <ModalsAndPopupsContainer screenSize={screenSize} />;
	
    return (
		<Grid container justify='center' className={classes.rootContainer}>

			{isFetchingConfig || isFetchingTranslation
				? (
					<Grid container item xs={12} justify="center" className={classes.layoutContainer}>
						<Spinner />
					</Grid>
				) : (
					<Fragment>
						{/* Header */}
						{isStandAloneApp && (
							<Grid item xs={12}>
								<Header id='header' data-test='header' />
							</Grid>
						)}

						{/* Navigation bar/ tabs */}
						{/**
						<OutsideAlerter setShouldHide={setShouldHide} shouldHide={shouldHide}>
							<Navbar shouldHide={shouldHide}/>
						</OutsideAlerter>
						 */}

						{/* Page Content */}
						<Grid item xs={12}>
							<Grid container className={isStandAloneApp ? classes.layoutContainer: classes.layoutContainerForEmbeddedApp }>
								<Grid id='content' data-test='content' item xs={12} className={classes.pageContainer}>
									<Component {...route}  {...componentProps} />
								</Grid>
							</Grid>
						</Grid>

						{/* Page Footer */}
						<Grid item xs={12}>
							<Footer id='footer' data-test='footer' screenSize={screenSize} termsAndConditionUrl={termsAndConditionUrl} />
						</Grid>

						{/* Global Popups & Overlays */}
						<ModalsAndPopupsContainer screenSize={screenSize} />
					</Fragment>
				)}
		</Grid>
	);
}


LayoutContainer.propTypes = {
	component: PropTypes.any.isRequired,
	componentProps: PropTypes.object,
	route: PropTypes.object.isRequired,	//route object which includes match, location and history
	screenSize: PropTypes.string.isRequired,
    isStandAloneApp: PropTypes.bool.isRequired,
	termsAndConditionUrl: PropTypes.string.isRequired,
	hasConfig: PropTypes.bool.isRequired,
	hasTranslation: PropTypes.bool.isRequired,
    isFetchingConfig: PropTypes.bool.isRequired,
	isFetchingTranslation: PropTypes.bool.isRequired,
    hideNudgeAction: PropTypes.func.isRequired,
	hidePopupAction: PropTypes.func.isRequired,
};


const mapStateToProps = ({ app, appConfig }) => {
	const { isFetchingConfig, config, isFetchingTranslation, translation  } = appConfig;
	const lang = appConfig.lang;

	return {
		screenSize: app.screenSize,
        isStandAloneApp: config.generalConfig && config.generalConfig.isStandAloneApp, //used to determine whether the React App is standalone or embedded inside an Angular App
		hasConfig: Boolean(Object.keys(config).length),
		hasTranslation: Boolean(translation[lang]),
		isFetchingConfig,
		isFetchingTranslation,
        termsAndConditionUrl: config.generalConfig ? config.generalConfig.termsAndConditionUrl : ''
	};
};

const mapDispatchToProps = { hideNudgeAction, hidePopupAction };

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(LayoutContainer));