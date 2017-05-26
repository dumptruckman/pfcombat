import React from "react";
import PropTypes from "prop-types";
import "../composite.css";
import CombatantListContainer from "../containers/CombatantListContainer";
import { ENEMY } from "../CombatantType";
import Button from "./Button";
import CombatantsController from "../controllers/CombatantsController";

const EnemyEditor = ({ combatantsController, showModal, smallMode }) => (
  <div id="enemy-editor" className="combat-pane">
    {!smallMode && <p className="combat-pane__title">Enemy Editor</p>}
    <div className="button-panel">
      <Button
        className="button"
        style={{ flexGrow: 2 }}
        onClick={() => combatantsController.addBlankCombatant(false)}
      >New Monster</Button>
      <Button
        className="button"
        onClick={() => showModal("IMPORT_EXPORT", false)}
      >Import/Export</Button>
    </div>
    <CombatantListContainer
      combatantsController={combatantsController}
      combatantType={ENEMY}
    />
    <div className="button-panel" style={{ display: "flex" }}>
      <Button
        style={{ flex: "1 1 auto" }}
        className="button"
        onClick={() => combatantsController.makeAllActive(combatantsController.getEnemies())}
      >Make All Active</Button>
      <Button
        style={{ flex: "1 1 auto" }}
        className="button"
        onClick={() => combatantsController.makeAllIdle(combatantsController.getEnemies())}
      >Make All Idle</Button>
      <Button
        className="button"
        onClick={() => combatantsController.removeCombatants(false)}
      >Clear</Button>
    </div>
  </div>
    );

EnemyEditor.propTypes = {
  combatantsController: PropTypes.instanceOf(CombatantsController).isRequired,
  showModal: PropTypes.func.isRequired,
  smallMode: PropTypes.bool.isRequired,
};

export default EnemyEditor;
