import React, { Component } from "react";
import PropTypes from "prop-types";
import sizeMe from "react-sizeme";
import "./App.css";
import InitiativeTracker from "./components/InitiativeTracker";
import PartyEditor from "./components/PartyEditor";
import EnemyEditor from "./components/EnemyEditor";
import CombatantsController from "./controllers/CombatantsController";
import ModalConductor from "./ModalConductor";
import CombatantModel from "./models/CombatantModel";
import { ENEMY, INITIATIVE, PARTY } from "./CombatantType";
import Button from "./components/Button";

class App extends Component {
  // width 1105

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
      currentTab: INITIATIVE,
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
    this.setTab = this.setTab.bind(this);
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

  setTab(currentTab) {
    this.setState({
      currentTab,
    });
  }

  render() {
    let smallMode = false;
    const { width } = this.props.size;
    if (width < 1105) {
      smallMode = true;
    }

    const initiativePane = (<InitiativeTracker
      activeCombatants={[...this.state.combatants.values()].filter(c => c.inCombat)}
      combatantsController={this.combatantsController}
      smallMode={smallMode}
    />);
    const partyPane = (<PartyEditor
      combatantsController={this.combatantsController}
      showModal={this.showModal}
      smallMode={smallMode}
    />);
    const enemiesPane = (<EnemyEditor
      combatantsController={this.combatantsController}
      showModal={this.showModal}
      smallMode={smallMode}
    />);

    let panesToShow = (<div id="combat-tab" className="tab">
      {initiativePane}
      {partyPane}
      {enemiesPane}
    </div>);
    if (smallMode) {
      switch (this.state.currentTab) {
        case INITIATIVE:
          panesToShow = <div id="combat-tab" className="tab">{initiativePane}</div>;
          break;
        case PARTY:
          panesToShow = <div id="combat-tab" className="tab">{partyPane}</div>;
          break;
        case ENEMY:
          panesToShow = <div id="combat-tab" className="tab">{enemiesPane}</div>;
          break;
        default:
          break;
      }
    }

    return (
      <div>
        <div className="tab tab--small-mode">
          {smallMode && <div className="button-panel">
            <Button
              className={this.state.currentTab === INITIATIVE
                  ? "button-disabled button-disabled--tab" : "button button--tab"}
              style={{ flex: "1 1 auto" }}
              onClick={() => { this.setTab(INITIATIVE); }}
            >Initiative Tracker</Button>
            <Button
              className={this.state.currentTab === PARTY
                ? "button-disabled button-disabled--tab" : "button button--tab"}
              style={{ flex: "1 1 auto" }}
              onClick={() => { this.setTab(PARTY); }}
            >Party Editor</Button>
            <Button
              className={this.state.currentTab === ENEMY
                ? "button-disabled button-disabled--tab" : "button button--tab"}
              style={{ flex: "1 1 auto" }}
              onClick={() => { this.setTab(ENEMY); }}
            >Enemy Editor</Button>
          </div>}
          {panesToShow}
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

App.propTypes = {
  size: PropTypes.shape({
    width: PropTypes.number.isRequired,
  }).isRequired,
};

export default sizeMe({ monitorWidth: true })(App);
