import React, { Component } from "react";
import "./App.css";
import InitiativeTracker from "./components/InitiativeTracker";
import PartyEditor from "./components/PartyEditor";
import EnemyEditor from "./components/EnemyEditor";
import CombatantsController from "./controllers/CombatantsController";
import ModalConductor from "./ModalConductor";
import CombatantModel from "./models/CombatantModel";

class App extends Component {

  constructor() {
    super();
    const combatants = JSON.parse(localStorage.getItem("combatants"));
    const initialCombatants = new Map();
    if (combatants !== null && combatants.constructor === Array) {
      combatants.map(c => new CombatantModel(c)).forEach(c => initialCombatants.set(c.id, c));
    }
    this.state = {
      combatants: initialCombatants,
      currentModal: null,
      modalTarget: null,
    };
    this.combatantsController = new CombatantsController();
    this.combatantsController.updateCombatant
        = this.combatantsController.updateCombatant.bind(this);
    this.combatantsController.setCombatantProp
        = this.combatantsController.setCombatantProp.bind(this);
    this.combatantsController.addCombatant = this.combatantsController.addCombatant.bind(this);
    this.combatantsController.addBlankCombatant
        = this.combatantsController.addBlankCombatant.bind(this);
    this.combatantsController.createCombatant
        = this.combatantsController.createCombatant.bind(this);
    this.combatantsController.removeCombatant
        = this.combatantsController.removeCombatant.bind(this);
    this.combatantsController.removeCombatants
        = this.combatantsController.removeCombatants.bind(this);
    this.combatantsController.updateCombatants
        = this.combatantsController.updateCombatants.bind(this);
    this.combatantsController.getParty = this.combatantsController.getParty.bind(this);
    this.combatantsController.getEnemies = this.combatantsController.getEnemies.bind(this);
    this.combatantsController.getActiveCombatants
        = this.combatantsController.getActiveCombatants.bind(this);
    this.combatantsController.getAllCombatants
        = this.combatantsController.getAllCombatants.bind(this);
    this.combatantsController.getCombatant = this.combatantsController.getCombatant.bind(this);
    this.combatantsController.showCurrentHpDialog
        = this.combatantsController.showCurrentHpDialog.bind(this);
    this.combatantsController.getCombatantById
        = this.combatantsController.getCombatantById.bind(this);
    this.combatantsController.getCombatantByName
        = this.combatantsController.getCombatantByName.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.showModal = this.showModal.bind(this);
    this.componentDidUpdate = this.componentDidUpdate.bind(this);
    this.componentCleanup = this.componentCleanup.bind(this);
  }

  componentDidUpdate() {
    this.componentCleanup();
  }

  componentCleanup() {
    localStorage.setItem("combatants", JSON.stringify([...this.state.combatants.values()]));
  }

  hideModal() {
    this.setState({
      modalTarget: null,
      currentModal: null,
    });
  }

  showModal(id, target) {
    this.setState({
      modalTarget: target,
      currentModal: id,
    });
  }

  render() {
    return (
      <div>
        <div id="combat-tab" className="tab">
          <InitiativeTracker
            activeCombatants={[...this.state.combatants.values()].filter(c => c.inCombat)}
            combatantsController={this.combatantsController}
          />
          <PartyEditor
            combatantsController={this.combatantsController}
            showModal={this.showModal}
          />
          <EnemyEditor
            combatantsController={this.combatantsController}
            showModal={this.showModal}
          />
        </div>
        <div>
          <ModalConductor
            currentModal={this.state.currentModal}
            modalTarget={this.state.modalTarget}
            combatantsController={this.combatantsController}
            hideModal={this.hideModal}
          />
        </div>
      </div>
    );
  }
}


export default App;
