import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Grid, Toolbar, Typography, Button, makeStyles } from '@material-ui/core';
import { useIntl } from 'react-intl';
import Translate from '../../components/common/translate';
import PopupContainer from '../../components/common/popups/PopupContainer';

const useStyles = makeStyles({
	container: {
		position: 'relative',
		clear: 'both',
		width: '100%',
		backgroundColor: '#333333',
		height: 106
	},
	toolbarFooter: {
		height: '100%',
		padding: '0 22px'
	}
});

export const Footer = ({ screenSize, termsAndConditionUrl }) => {
	const intl = useIntl();
	const classes = useStyles();

	const [ showTermsAndConditions, setTermsAndConditions ] = useState(false);
	const handleClick = () => {
		setTermsAndConditions(true);
	};
	const handleClose = () => {
		setTermsAndConditions(false);
	};
	return (
		<Grid className={classes.container} id="footer" data-test="footer">
			<Toolbar className={classes.toolbarFooter}>
				<Grid item xs={12}>
					<Button
						id='termsNConditionLink'
						data-test='termsNConditionLink'
						style={{
							color: '#ffffff',
							fontWeight: 'bold',
							fontSize: '16px',
							padding: 0
						}}
						onClick={handleClick}
						size="small"
					>
						<Translate id="common.termsAndconditions" />
					</Button>
					{showTermsAndConditions && (
						<PopupContainer
							id='popupContainer'
							title={intl.formatMessage({ id: 'common.termsAndconditions' })}
							open={showTermsAndConditions}
							onClose={handleClose}
							screenSize={screenSize}
						>
							<iframe
								id='termsNConditionsIFrame'
								title={intl.formatMessage({ id: 'common.termsAndconditions' })}
								height="600px"
								style={{
									marginRight: 12,
									border: 'none'
								}}
								src={termsAndConditionUrl}
							/>
						</PopupContainer>
					)}
				</Grid>
				<Grid item xs={12}>
					<Typography
						id='copyRightsReserved'
						data-test='copyRightsReserved'
						style={{
							color: '#ebebeb',
							fontSize: '16px',
							textAlign: 'right'
						}}
					>
						<Translate id="common.copyRights" />
					</Typography>
				</Grid>
			</Toolbar>
		</Grid>
	);
};

Footer.propTypes = {
	screenSize: PropTypes.string.isRequired,
	termsAndConditionUrl: PropTypes.string.isRequired
};

export default Footer;