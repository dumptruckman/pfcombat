import React, { Component } from "react";
import PropTypes from "prop-types";
import sizeMe from "react-sizeme";
import "./App.css";
import InitiativeTracker from "./components/InitiativeTracker";
import CombatantsEditor from "./components/CombatantsEditor";
import CombatantsController from "./controllers/CombatantsController";
import ModalConductor from "./ModalConductor";
import CombatantModel from "./models/CombatantModel";
import { ENEMY, INITIATIVE, PARTY } from "./CombatantType";
import Button from "./components/Button";
import WebAppFrame from "./components/layout/WebAppFrame";
import ButtonPanel from "./components/layout/ButtonPanel";
import packageInfo from "../package.json";

class App extends Component {
  // width 1105

  constructor() {
    super();
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
    this.combatantsController.makeAllActive = this.combatantsController.makeAllActive.bind(this);
    this.combatantsController.makeAllIdle = this.combatantsController.makeAllIdle.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.showModal = this.showModal.bind(this);
    this.componentDidUpdate = this.componentDidUpdate.bind(this);
    this.componentCleanup = this.componentCleanup.bind(this);
    this.setTab = this.setTab.bind(this);
    this.createFirstRunSampleData = this.createFirstRunSampleData.bind(this);

    const combatants = localStorage.getItem("combatants") !== null
        ? JSON.parse(localStorage.getItem("combatants")) : this.createFirstRunSampleData();
    const initialCombatants = new Map();
    if (combatants !== null && combatants.constructor === Array) {
      combatants.map(c => new CombatantModel(c)).forEach(c => initialCombatants.set(c.id, c));
    }
    this.state = {
      combatants: initialCombatants,
      currentModal: null,
      modalTarget: null,
      modalData: null,
      currentTab: INITIATIVE,
    };
  }

  componentDidUpdate() {
    this.componentCleanup();
  }

  setTab(currentTab) {
    this.setState({
      currentTab,
    });
  }

  createFirstRunSampleData() {
    const combatants = [];
    let c = this.combatantsController.createCombatant(true, combatants);
    c.inCombat = true;
    combatants.push(c);
    c = this.combatantsController.createCombatant(true, combatants);
    c.inCombat = true;
    combatants.push(c);
    c = this.combatantsController.createCombatant(true, combatants);
    c.inCombat = true;
    combatants.push(c);
    c = this.combatantsController.createCombatant(true, combatants);
    c.inCombat = true;
    combatants.push(c);
    c = this.combatantsController.createCombatant(false, combatants);
    c.inCombat = true;
    combatants.push(c);
    c = this.combatantsController.createCombatant(false, combatants);
    c.inCombat = true;
    combatants.push(c);
    c = this.combatantsController.createCombatant(false, combatants);
    c.inCombat = true;
    combatants.push(c);
    return combatants;
  }

  hideModal() {
    this.setState({
      modalTarget: null,
      currentModal: null,
      modalData: null,
    });
  }

  showModal(id, target, data) {
    this.setState({
      modalTarget: target,
      currentModal: id,
      modalData: data,
    });
  }

  componentCleanup() {
    localStorage.setItem("combatants", JSON.stringify([...this.state.combatants.values()]));
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
    const partyPane = (<CombatantsEditor
      combatantsController={this.combatantsController}
      showModal={this.showModal}
      smallMode={smallMode}
      combatantType={PARTY}
    />);
    const enemiesPane = (<CombatantsEditor
      combatantsController={this.combatantsController}
      showModal={this.showModal}
      smallMode={smallMode}
      combatantType={ENEMY}
    />);

    let panesToShow = (<WebAppFrame>
      {initiativePane}
      {partyPane}
      {enemiesPane}
    </WebAppFrame>);
    if (smallMode) {
      switch (this.state.currentTab) {
        case INITIATIVE:
          panesToShow = <WebAppFrame>{initiativePane}</WebAppFrame>;
          break;
        case PARTY:
          panesToShow = <WebAppFrame>{partyPane}</WebAppFrame>;
          break;
        case ENEMY:
          panesToShow = <WebAppFrame>{enemiesPane}</WebAppFrame>;
          break;
        default:
          break;
      }
    }

    return (
      <div>
        <WebAppFrame fullPage>
          {smallMode && <ButtonPanel>
            <Button
              large
              grow
              style={{ flexBasis: 0 }}
              disabled={this.state.currentTab === INITIATIVE}
              onClick={() => { this.setTab(INITIATIVE); }}
            >Initiative Tracker</Button>
            <Button
              large
              grow
              style={{ flexBasis: 0 }}
              disabled={this.state.currentTab === PARTY}
              onClick={() => { this.setTab(PARTY); }}
            >Party Editor</Button>
            <Button
              large
              grow
              style={{ flexBasis: 0 }}
              disabled={this.state.currentTab === ENEMY}
              onClick={() => { this.setTab(ENEMY); }}
            >Enemy Editor</Button>
          </ButtonPanel>}
          {panesToShow}
          <div style={{ display: "flex", justifyContent: "center" }}>
            {// eslint-disable-next-line jsx-a11y/no-static-element-interactions
              <span
                role="presentation"
                style={smallMode ? { fontSize: 10 } : {}}
              >v{packageInfo.version} [BETA]&nbsp;
                {// eslint-disable-next-line jsx-a11y/href-no-hash
                  <a
                    href="#"
                    onClick={() => {
                      window.localStorage.clear();
                      window.location.reload();
                    }}
                  >Reset App</a>
                } - To submit feedback&nbsp;
                <a
                  href="https://github.com/dumptruckman/pfcombat/issues"
                  target="_blank"
                  rel="noopener noreferrer"
                >click here</a>.
              </span>
            }
          </div>
        </WebAppFrame>
        <div>
          <ModalConductor
            currentModal={this.state.currentModal}
            modalTarget={this.state.modalTarget}
            modalData={this.state.modalData}
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
