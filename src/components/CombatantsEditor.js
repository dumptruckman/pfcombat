import React from "react";
import PropTypes from "prop-types";
import "../composite.css";
import CombatantListContainer from "../containers/CombatantListContainer";
import { CombatantType, PARTY } from "../CombatantType";
import Button from "./Button";
import CombatantsController from "../controllers/CombatantsController";
import ButtonPanel from "./layout/ButtonPanel";
import CombatPane from "./layout/CombatPane";

const CombatantsEditor = ({ combatantsController, showModal, smallMode, combatantType }) => (
  <CombatPane smallMode={smallMode} title={`${combatantType === PARTY ? "Party" : "Enemy"} Editor`}>
    <ButtonPanel>
      <Button
        grow
        onClick={() => combatantsController.addBlankCombatant(combatantType === PARTY)}
      >New {combatantType === PARTY ? "Party Member" : "Monster"}</Button>
      <Button
        onClick={() => showModal("IMPORT_EXPORT", combatantType === PARTY)}
      >Import/Export</Button>
    </ButtonPanel>
    <CombatantListContainer
      combatantsController={combatantsController}
      combatantType={combatantType}
    />
    <ButtonPanel>
      <Button
        grow
        onClick={() => combatantsController.makeAllActive(combatantType === PARTY
              ? combatantsController.getParty() : combatantsController.getEnemies())}
      >Make All Active</Button>
      <Button
        grow
        onClick={() => combatantsController.makeAllIdle(combatantType === PARTY
              ? combatantsController.getParty() : combatantsController.getEnemies())}
      >Make All Idle</Button>
      <Button
        onClick={() => combatantsController.removeCombatants(combatantType === PARTY)}
      >Clear</Button>
    </ButtonPanel>
  </CombatPane>
);

CombatantsEditor.propTypes = {
  combatantsController: PropTypes.instanceOf(CombatantsController).isRequired,
  showModal: PropTypes.func.isRequired,
  smallMode: PropTypes.bool.isRequired,
  combatantType: PropTypes.instanceOf(CombatantType).isRequired,
};

export default CombatantsEditor;
