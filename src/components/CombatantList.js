import React from "react";
import PropTypes from "prop-types";
import CombatantContainer from "../containers/CombatantContainer";
import CombatantsController from "../controllers/CombatantsController";
import InitiativeController from "../controllers/InitiativeController";
import CombatantModel from "../models/CombatantModel";
import { CombatantType } from "../CombatantType";

const CombatantList =
  ({ combatants, combatantsController, combatantType, selected, onClick, initController }) => (
    <div className="combatant-list-container">
      <ul className="combatant-list">
        {combatants.map((combatant, i) => (
          <CombatantContainer
            key={combatant.id}
            index={i}
            combatant={combatant}
            combatantType={combatantType}
            selected={selected === i}
            onClick={onClick}
            combatantsController={combatantsController}
            initController={initController}
          />
        ))}
      </ul>
    </div>
);

CombatantList.propTypes = {
  combatantsController: PropTypes.instanceOf(CombatantsController).isRequired,
  combatants: PropTypes.arrayOf(PropTypes.instanceOf(CombatantModel)).isRequired,
  combatantType: PropTypes.instanceOf(CombatantType).isRequired,
  selected: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
  initController: PropTypes.instanceOf(InitiativeController),
};

CombatantList.defaultProps = {
  initController: undefined,
};

export default CombatantList;
