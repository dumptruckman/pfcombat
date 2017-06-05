import React from "react";
import PropTypes from "prop-types";
import ValueButton from "./ValueButton";
import CombatantsController from "../controllers/CombatantsController";
import CombatantModel from "../models/CombatantModel";

const HPButton = ({ text, value, style, controller, combatant, type }) => {
  const actualStyle = style;
  actualStyle.minHeight = 30;
  actualStyle.minWidth = 30;
  return (
    <ValueButton
      text={text}
      value={value}
      style={actualStyle}
      onClick={() => {
        controller.showCurrentHpDialog(combatant, type);
      }}
    />
  );
};

HPButton.propTypes = {
  text: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  controller: PropTypes.instanceOf(CombatantsController).isRequired,
  combatant: PropTypes.instanceOf(CombatantModel).isRequired,
  style: PropTypes.objectOf(PropTypes.node),
  type: PropTypes.string,
};

HPButton.defaultProps = {
  style: {},
  type: "normal",
};

export default HPButton;
