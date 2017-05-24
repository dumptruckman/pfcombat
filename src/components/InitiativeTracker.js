import React, { Component } from "react";
import PropTypes from "prop-types";
import "../composite.css";
import "../font-awesome.css";
import CombatantListContainer from "../containers/CombatantListContainer";
import { INITIATIVE } from "../CombatantType";
import Button from "./Button";
import CombatantsController from "../controllers/CombatantsController";
import InitiativeController from "../controllers/InitiativeController";
import CombatantModel from "../models/CombatantModel";

class InitiativeTracker extends Component {

  constructor(props) {
    super(props);
    this.state = {
      initiative: {
        turnIndex: -1,
        roundCount: 0,
        order: [],
      },
      selected: -1,
    };
    this.initiativeController = new InitiativeController();
    this.initiativeController.getCombatantCount
        = this.initiativeController.getCombatantCount.bind(this);
    this.initiativeController.getInitIndex = this.initiativeController.getInitIndex.bind(this);
    this.initiativeController.updateTurnIndex
        = this.initiativeController.updateTurnIndex.bind(this);
    this.initiativeController.updateRoundCount
        = this.initiativeController.updateRoundCount.bind(this);
    this.initiativeController.rollInitiative = this.initiativeController.rollInitiative.bind(this);
    this.initiativeController.sortInitiative = this.initiativeController.sortInitiative.bind(this);
    this.initiativeController.nextTurn = this.initiativeController.nextTurn.bind(this);
    this.initiativeController.prevTurn = this.initiativeController.prevTurn.bind(this);
    this.initiativeController.getTurnIndex = this.initiativeController.getTurnIndex.bind(this);
    this.initiativeController.moveCombatant = this.initiativeController.moveCombatant.bind(this);
    this.initiativeController.resetInitiative
        = this.initiativeController.resetInitiative.bind(this);
    this.changeSelection = this.changeSelection.bind(this);
  }

  componentWillMount() {
    const order = this.props.combatantsController.getAllCombatants().map(c => c.id);
    this.setState(prevState => ({
      initiative: {
        ...prevState.initiative,
        order,
      },
    }));
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.initiative.turnIndex >= 0) {
      const id = this.state.initiative.order[this.state.initiative.turnIndex];
      const combatant = nextProps.combatantsController.getCombatantById(id);
      if (combatant.ready || combatant.delay) {
        this.initiativeController.nextTurn();
      }
    }
    nextProps.activeCombatants.forEach((nextCombatant) => {
      const prevCombatant = this.props.activeCombatants.filter(c => c.id === nextCombatant.id)[0];
      if ((prevCombatant.delay && !nextCombatant.delay)
          || (prevCombatant.ready && !nextCombatant.ready)) {
        this.initiativeController.moveCombatant(nextCombatant.id, this.state.initiative.turnIndex);
        // this.initiativeController.updateTurnIndex(
        //     this.initiativeController.getInitIndex(nextCombatant));
      }
    });
  }

  changeSelection(index) {
    this.setState(prevState => ({
      selected: (prevState.selected === index ? -1 : index),
    }));
  }

  render() {
    return (
      <div id="init-tracker" className="combat-pane">
        <p className="combat-pane__title">Initiative Tracker</p>
        <div className="button-panel">
          <Button
            className="button"
            style={{ flexGrow: 1 }}
            onClick={() => {
              this.initiativeController.rollInitiative();
            }}
          ><i className="fa fa-random fa-2x" aria-hidden="true" />Roll Initiative</Button>
          <div style={{ display: "flex", flexDirection: "column", flexBasis: "content" }}>
            <Button
              className="button"
              onClick={() => {
                this.initiativeController.sortInitiative();
              }}
            ><i className="fa fa-sort-numeric-desc" aria-hidden="true" />Sort</Button>
            <Button
              className="button"
              onClick={() => {
                this.initiativeController.resetInitiative();
              }}
            ><i className="fa fa-undo" aria-hidden="true" />Reset</Button>
          </div>
        </div>
        <CombatantListContainer
          combatantsController={this.props.combatantsController}
          combatantType={INITIATIVE}
          initController={this.initiativeController}
          selected={this.state.selected}
          changeSelection={this.changeSelection}
        />
        <div className="button-panel" style={{ display: "flex" }}>
          <Button
            className="button"
            style={{ flexBasis: "content" }}
            onClick={() => { this.initiativeController.prevTurn(); }}
          >
            <i className="fa fa-arrow-left fa-lg" aria-hidden="true" />Prev Turn</Button>
          <Button
            className="button"
            style={{ flexGrow: 1 }}
            onClick={() => { this.initiativeController.nextTurn(); }}
          >
            Next Turn<i className="fa fa-arrow-right fa-2x" aria-hidden="true" /></Button>
        </div>
      </div>
    );
  }
}

InitiativeTracker.propTypes = {
  activeCombatants: PropTypes.arrayOf(PropTypes.instanceOf(CombatantModel)).isRequired,
  combatantsController: PropTypes.instanceOf(CombatantsController).isRequired,
    //combatantsController: PropTypes.object.isRequired,
};

export default InitiativeTracker;
