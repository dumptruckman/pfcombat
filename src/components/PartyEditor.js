import React from "react";
import PropTypes from "prop-types";
import "../composite.css";
import CombatantListContainer from "../containers/CombatantListContainer";
import { PARTY } from "../CombatantType";
import Button from "./Button";
import CombatantsController from "../controllers/CombatantsController";
import ButtonPanel from "./layout/ButtonPanel";

const PartyEditor = ({ combatantsController, showModal, smallMode }) => (
  <div id="party-editor" className="combat-pane">
    {!smallMode && <p className="combat-pane__title">Party Editor</p>}
    <ButtonPanel>
      <Button
        grow
        onClick={() => combatantsController.addBlankCombatant(true)}
      >New Party Member</Button>
      <Button
        onClick={() => showModal("IMPORT_EXPORT", true)}
      >Import/Export</Button>
    </ButtonPanel>
    <CombatantListContainer
      combatantsController={combatantsController}
      combatantType={PARTY}
    />
    <ButtonPanel>
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
    </ButtonPanel>
  </div>
);

PartyEditor.propTypes = {
  combatantsController: PropTypes.instanceOf(CombatantsController).isRequired,
  showModal: PropTypes.func.isRequired,
  smallMode: PropTypes.bool.isRequired,
};

export default PartyEditor;
