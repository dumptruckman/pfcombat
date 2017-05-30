import React from "react";
import PropTypes from "prop-types";
import "../composite.css";
import CombatantListContainer from "../containers/CombatantListContainer";
import { PARTY } from "../CombatantType";
import Button from "./Button";
import CombatantsController from "../controllers/CombatantsController";

const PartyEditor = ({ combatantsController, showModal, smallMode }) => (
  <div id="party-editor" className="combat-pane">
    {!smallMode && <p className="combat-pane__title">Party Editor</p>}
    <div className="button-panel">
      <Button
        grow
        onClick={() => combatantsController.addBlankCombatant(true)}
      >New Party Member</Button>
      <Button
        onClick={() => showModal("IMPORT_EXPORT", true)}
      >Import/Export</Button>
    </div>
    <CombatantListContainer
      combatantsController={combatantsController}
      combatantType={PARTY}
    />
    <div className="button-panel" style={{ display: "flex" }}>
      <Button
        grow
        onClick={() => combatantsController.makeAllActive(combatantsController.getParty())}
      >Make All Active</Button>
      <Button
        grow
        onClick={() => combatantsController.makeAllIdle(combatantsController.getParty())}
      >Make All Idle</Button>
      <Button
        onClick={() => combatantsController.removeCombatants(true)}
      >Clear</Button>
    </div>
  </div>
    );

PartyEditor.propTypes = {
  combatantsController: PropTypes.instanceOf(CombatantsController).isRequired,
  showModal: PropTypes.func.isRequired,
  smallMode: PropTypes.bool.isRequired,
};

export default PartyEditor;
