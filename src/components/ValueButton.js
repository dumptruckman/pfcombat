import React from "react";
import PropTypes from "prop-types";
import Radium from "radium";
import "../composite.css";
import FlexBox from "./layout/FlexBox";

const styles = {
  base: {
    backgroundColor: "white",
    margin: 1,
    borderColor: "black",
    borderWidth: 1,
    boxShadow: "inset 0 1px 0 0 #F4FAED,inset 0 -1px 0 0 #69932B,inset 0 0 0 1px #ADD76F",

    ":hover": {
      backgroundColor: "#eaeae7",
      boxShadow: "inset 0 0 0 0 #F4FAED,inset 0 0 0 0 #69932B,inset 0 0 0 0 #ADD76F",
    },
  },
};

const ValueButton = ({ text, value, onClick, style }) => (
  <FlexBox>
    <span className="combatant__combat-stats-label">{text}</span>
    <button
      style={[
        styles.base,
        style,
      ]}
      onClick={onClick}
    >{value}</button>
  </FlexBox>
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

export default Radium(ValueButton);
