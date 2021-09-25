import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import { AppBar, Toolbar, makeStyles } from "@material-ui/core";
import ComparisonIcon from "../../components/comparison/ComparisonIcon";
import BasketIcon from "../../components/basketSummary/BasketIcon";
import { ReactComponent as LogoSVG } from "../../assets/svg/logo.svg";
import LangSelector from "./LangSelector";

const useStyles = makeStyles({
  appBar: {
    boxShadow: "0 2px 4px 0 rgba(0, 0, 0, 0.2)",
    backgroundColor: "#fff",
    height: 71,
    position: "relative",
    zIndex: 3
  },
  toolbar: {
    height: "100%",
    padding: "0 11px"
  }
});

const Header = () => {
  const classes = useStyles();
  const { config } = useSelector(({ appConfig }) => appConfig);
  const navigation = config?.navigation;

  let link = "/";
  if (navigation && navigation[0] && navigation[0].link) {
    link = navigation[0].link;
  }

  return (
    <AppBar
      id="header"
      data-test="header"
      position="static"
      classes={{ root: classes.appBar }}
    >
      <Toolbar className={classes.toolbar}>
        <Link id="logo" data-test="logo" to={link} style={{ flexGrow: 1, paddingLeft: 26 }}>
          <LogoSVG style={{ verticalAlign: "middle" }} />
        </Link>

        <div style={{ width: 113, marginRight: 13, flexGrow: 0 }}>
          <LangSelector id="LangSelector" data-test="LangSelector" />
        </div>

        <ComparisonIcon
          id="comparisonIcon"
          data-test="comparisonIcon"
          style={{ marginRight: 13, flexGrow: 0 }}
        />
        <BasketIcon
          id="basketIcon"
          data-test="basketIcon"
          style={{ flexGrow: 0 }}
        />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
