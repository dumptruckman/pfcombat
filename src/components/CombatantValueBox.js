import React from "react";
import PropTypes from "prop-types";
import CombatantsController from "../controllers/CombatantsController";
import CombatantModel from "../models/CombatantModel";
import ValueBox from "./ValueBox";

const CombatantValueBox = props => (
  <ValueBox
    text={props.text}
    title={props.title}
    size={props.size}
    style={props.style}
    value={props.combatant[props.prop]}
    placeholder={props.placeholder}
    className={props.className}
    scroll={props.scroll}
    onChange={(value) => {
      props.controller.setCombatantProp(props.combatant, props.prop, value);
    }}

  />
);

CombatantValueBox.propTypes = {
  text: PropTypes.string,
  prop: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  style: PropTypes.objectOf(PropTypes.node),
  placeholder: PropTypes.string,
  className: PropTypes.string,
  size: PropTypes.number,
  scroll: PropTypes.bool,
  controller: PropTypes.instanceOf(CombatantsController).isRequired,
  combatant: PropTypes.instanceOf(CombatantModel).isRequired,
};

CombatantValueBox.defaultProps = {
  text: "",
  placeholder: "",
  className: undefined,
  size: undefined,
  scroll: false,
  style: {},
};

export default CombatantValueBox;
