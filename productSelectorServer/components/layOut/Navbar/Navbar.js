import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import Translate from "../../../components/common/translate";
import { AppBar, Tabs, Tab, makeStyles, Grid } from "@material-ui/core";

const useStyles = makeStyles({
  appBar: {
    boxShadow: "none",
    zIndex: 2,
    backgroundColor: "white",
    position: "relative"
  },
  secondaryAppBar: {
    boxShadow: "0 2px 4px 0 rgba(0, 0, 0, 0.2)",
    zIndex: 2,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    position: "absolute"
  },
  indicator: {
    height: 3
  },
  flexContainer: {
    height: 72,
    alignItems: "center"
  },
  secondaryFlexContainer: {
    height: 60,
    alignItems: "center"
  }
});

const Navbar = ({ navBarItems, shouldHide }) => {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(navBarItems[0].key);
  const [subListing, setSubListing] = useState(navBarItems[0].subListing);
  // const [subActiveTab, setSubActiveTab] = useState( subListing ? subListing[0].key : null );

  const getActiveTabUrl = () => {
    const currURI = location.pathname;
    setSubListing();
    setActiveTab();
    navBarItems.forEach(el => {
      if (el.link === currURI) {
        setActiveTab(el.key);
      } else if (el.subListing) {
        el.subListing.forEach(subEl => {
          if (subEl.link === currURI) {
            setActiveTab(el.key);
          }
        });
      }
    });
  };

  useEffect(() => {
    getActiveTabUrl();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldHide]);

  const handleTabClick = (e, tabKey) => {
    const currTab = navBarItems.find(el => el.key === tabKey);

    if (tabKey === activeTab && subListing) {
      getActiveTabUrl();
      return;
    }

    if (currTab.subListing) {
      setSubListing(currTab.subListing);
      // setSubActiveTab();
    } else {
      setSubListing();
      if (currTab.link) {
        history.push(currTab.link);
      }
    }
    setActiveTab(tabKey);
  };

  const handleSubListClick = (e, tabKey) => {
    // setSubActiveTab(tabKey);
    const currTab = subListing.find(el => el.key === tabKey);
    if (currTab.link) {
      history.push(currTab.link);
    }
  };

  return (
    <React.Fragment>
      <AppBar position="fixed" classes={{ root: classes.appBar }}>
        <Tabs
          TabIndicatorProps={{ children: <Grid /> }}
          style={{ paddingLeft: 26 }}
          value={activeTab}
          onChange={handleTabClick}
          textColor="primary"
          indicatorColor="primary"
          aria-label="navigation tabs"
          classes={{
            flexContainer: classes.flexContainer,
            indicator: classes.indicator
          }}
        >
          {navBarItems.map(item => (
            <NavTab
              key={item.key}
              label={<Translate id={item.translationKey} />}
              value={item.key}
              {...item}
              aria-label={item.key}
            />
          ))}
        </Tabs>
      </AppBar>
      {subListing && (
        <AppBar position="relative" classes={{ root: classes.secondaryAppBar }}>
          <Tabs
            value={{}}
            style={{ paddingLeft: 26 }}
            onChange={handleSubListClick}
            textColor="primary"
            indicatorColor="primary"
            aria-label="navigation tabs"
            classes={{
              flexContainer: classes.secondaryFlexContainer
            }}
          >
            {subListing.map(item => (
              <NavTab
                key={item.key}
                label={<Translate id={item.translationKey} />}
                value={item.key}
                {...item}
                aria-label={item.key}
              />
            ))}
          </Tabs>
        </AppBar>
      )}
    </React.Fragment>
  );
};

const useTabStyles = makeStyles({
  root: {
    textTransform: "none",
    fontFamily: "VodafoneLT",
    minWidth: "auto",
    width: "auto",
    marginRight: 60,
    padding: 0,
    fontSize: 24,
  }
});

const NavTab = props => {
  const classes = useTabStyles();

  return <Tab disableRipple classes={classes} {...props} />;
};

Navbar.propTypes = {
  navBarItems: PropTypes.array.isRequired,
  shouldHide: PropTypes.bool.isRequired
};

const mapStateToProps = ({ appConfig }) => ({
  navBarItems: appConfig.config.navigation
});

export default connect(mapStateToProps)(Navbar);
