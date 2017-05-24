import React from "react";
import PropTypes from "prop-types";
import "../composite.css";
import Button from "./Button";

const ValueButton = ({ text, value, onClick, style }) => (
  <div className="combatant__info">
    <span className="combatant__combat-stats-label">{text}</span>
    <Button className="value-button" style={style || {}} onClick={onClick}>{value}</Button>
  </div>
);

ValueButton.propTypes = {
  text: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  onClick: PropTypes.func,
  style: PropTypes.objectOf(PropTypes.node),
};

ValueButton.defaultProps = {
  onClick() {},
  style: {},
};

export default ValueButton;
