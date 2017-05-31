import React from "react";
import PropTypes from "prop-types";
import Radium from "radium";

const styles = {
  base: {
    minWidth: 360,
    margin: 4,
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
  },
};

const titleStyles = {
  base: {
    textAlign: "center",
    fontSize: 30,
  },
};

const CombatPane = props => (
  <div style={[styles.base]}>
    {!props.smallMode && <p style={[titleStyles.base]}>{props.title}</p>}
    {props.children}
  </div>
);

CombatPane.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.element,
  ]).isRequired,
  title: PropTypes.string,
  smallMode: PropTypes.bool,
};

CombatPane.defaultProps = {
  title: "",
  smallMode: false,
};

export default Radium(CombatPane);
