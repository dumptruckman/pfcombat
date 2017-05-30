import React from "react";
import PropTypes from "prop-types";
import Radium from "radium";

const styles = {
  base: {
    display: "flex",
    height: "auto",
    flex: "0 0 auto",
  },
  vertical: {
    flexDirection: "column",
  },
};

const ButtonPanel = props => (
  <div style={[styles.base, props.vertical && styles.vertical]}>
    {props.children}
  </div>
);

ButtonPanel.propTypes = {
  vertical: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.element,
  ]).isRequired,
};

ButtonPanel.defaultProps = {
  vertical: false,
};

export default Radium(ButtonPanel);
