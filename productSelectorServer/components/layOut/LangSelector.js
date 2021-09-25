import React, { useCallback } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { MenuItem } from "@material-ui/core";
import Select from "../../components/common/dropdown/Select";
import { setLang } from "../../actions/config";
import constants from '../../constants/appConstants';

const renderItems = ({ lang, text }) => (
  <MenuItem key={lang} value={lang}>
    {text}
  </MenuItem>
);

renderItems.propTypes = {
  lang: PropTypes.string,
  text: PropTypes.string
};

export const LangSelector = ({ selectedLang, langs, setLang }) => {
  const handleChange = useCallback(
    event => { setLang(event.target.value) }
    ,[setLang]
  );

  return (
    <Select size={constants.size.SMALL} value={selectedLang} onChange={handleChange}>
      {langs.map(renderItems)}
    </Select>
  );
};

LangSelector.propTypes = {
  langs: PropTypes.array,
  selectedLang: PropTypes.string,
  setLang: PropTypes.func
};

const mapStateToProps = ({ appConfig }) => ({
  selectedLang: appConfig.lang,
  langs: appConfig.config.langConfig.languages
});

const mapDispatchToProp = { setLang };

export default connect(mapStateToProps, mapDispatchToProp)(LangSelector);