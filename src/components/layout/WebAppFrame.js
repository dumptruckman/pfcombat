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

const WebAppFrame = props => (
  <div style={[styles.base, props.fullPage && styles.fullPage]}>
    {props.children}
  </div>
);

WebAppFrame.propTypes = {
  fullPage: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.element,
  ]).isRequired,
};

WebAppFrame.defaultProps = {
  fullPage: false,
};

export default Radium(WebAppFrame);
