import React from "react";
import PropTypes from "prop-types";
import Radium from "radium";

const styles = {
  base: {
    display: "flex",
    height: "100%",
    width: "100%",
  },
  fullPage: {
    flexDirection: "column",
    position: "fixed",
  },
};

const WebAppPanel = props => (
  <div style={[styles.base, props.fullPage && styles.fullPage]}>
    {props.children}
  </div>
);

WebAppPanel.propTypes = {
  fullPage: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.element,
  ]).isRequired,
};

WebAppPanel.defaultProps = {
  fullPage: false,
};

export default Radium(WebAppPanel);
