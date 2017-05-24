import React from "react";
import PropTypes from "prop-types";
import ValueButton from "./ValueButton";
import CombatantsController from "../controllers/CombatantsController";
import CombatantModel from "../models/CombatantModel";

const HPButton = ({ text, value, style, controller, combatant }) => (
  <ValueButton
    text={text}
    value={value}
    style={style}
    onClick={() => {
      controller.showCurrentHpDialog(combatant);
    }}
  />
);

HPButton.propTypes = {
  text: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  controller: PropTypes.instanceOf(CombatantsController).isRequired,
  combatant: PropTypes.instanceOf(CombatantModel).isRequired,
  style: PropTypes.objectOf(PropTypes.node),
};

HPButton.defaultProps = {
  style: {},
};

export default HPButton;
