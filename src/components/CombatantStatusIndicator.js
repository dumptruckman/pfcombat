import React from "react";
import PropTypes from "prop-types";
import Radium from "radium";

const styles = {
  base: {
    flexBasis: "content",
    fontSize: 20,
    marginLeft: 2,
    width: 30,
  },
};

const CombatantStatusIndicator = props => (
  <div style={[styles.base]}>
    {props.turn ? <i className="fa fa-play" /> : ""}
    {props.delay ? <i className="fa fa-hourglass-half" /> : ""}
    {props.ready ? <i className="fa fa-bullseye" /> : ""}
  </div>
);

CombatantStatusIndicator.propTypes = {
  turn: PropTypes.bool.isRequired,
  ready: PropTypes.bool.isRequired,
  delay: PropTypes.bool.isRequired,
};

export default Radium(CombatantStatusIndicator);
