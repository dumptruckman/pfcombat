import React from "react";
import PropTypes from "prop-types";
import Combatant from "../components/Combatant";
import CombatantModel from "../models/CombatantModel";
import { CombatantType } from "../CombatantType";
import CombatantsController from "../controllers/CombatantsController";
import InitiativeController from "../controllers/InitiativeController";

const CombatantContainer = props => (
  <Combatant {...props} />
);

CombatantContainer.propTypes = {
  index: PropTypes.number.isRequired,
  combatant: PropTypes.instanceOf(CombatantModel).isRequired,
  combatantType: PropTypes.instanceOf(CombatantType).isRequired,
  selected: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  combatantsController: PropTypes.instanceOf(CombatantsController).isRequired,
  initController: PropTypes.instanceOf(InitiativeController),
};

CombatantContainer.defaultProps = {
  selected: false,
  initController: undefined,
};

export default CombatantContainer;
