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
import ButtonPanel from "./layout/ButtonPanel";
import CombatPane from "./layout/CombatPane";

class InitiativeTracker extends Component {

  constructor(props) {
    super(props);
    const localInit = JSON.parse(localStorage.getItem("initiative"));
    const localValid = localInit !== null;
    this.state = {
      initiative: {
        turnIndex: localValid && localInit.turnIndex !== null ? localInit.turnIndex : -1,
        roundCount: localValid && localInit.roundCount !== null ? localInit.roundCount : 0,
        order: localValid && localInit.order !== null ? localInit.order : [],
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
    this.shiftSelection = this.shiftSelection.bind(this);
    this.componentDidUpdate = this.componentDidUpdate.bind(this);
    this.componentCleanup = this.componentCleanup.bind(this);

    this.componentCleanup();
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
      if (prevCombatant) {
        if (nextCombatant) {
          if ((prevCombatant.delay && !nextCombatant.delay)
            || (prevCombatant.ready && !nextCombatant.ready)) {
            this.initiativeController
            .moveCombatant(nextCombatant.id, this.state.initiative.turnIndex);
          }
          if (prevCombatant.inCombat && !nextCombatant.inCombat) {
            this.setState({
              selected: -1,
            });
          }
        }
      } else if (nextCombatant.inCombat) {
        this.setState(prevState => ({
          initiative: {
            ...prevState.initiative,
            order: [
              ...prevState.initiative.order,
              nextCombatant.id,
            ],
          },
        }));
      }
    });
    if (nextProps.activeCombatants.length < this.props.activeCombatants.length) {
      this.props.activeCombatants.forEach((prevCombatant) => {
        const nextCombatant = nextProps.activeCombatants.filter(c => c.id === prevCombatant.id)[0];
        if (!nextCombatant) {
          const index = this.initiativeController.getInitIndex(prevCombatant);
          this.setState((prevState) => {
            let newSelected = prevState.selected;
            if (prevState.selected === index) {
              newSelected = -1;
            }
            const newOrder = [...prevState.initiative.order];
            newOrder.splice(index, 1);
            return {
              selected: newSelected,
              initiative: {
                ...prevState.initiative,
                order: newOrder,
              },
            };
          });
        }
      });
    }
  }

  componentDidUpdate() {
    this.componentCleanup();
  }

  componentCleanup() {
    localStorage.setItem("initiative", JSON.stringify(this.state.initiative));
  }

  changeSelection(index) {
    this.setState(prevState => ({
      selected: (prevState.selected === index ? -1 : index),
    }));
  }

  shiftSelection(amount) {
    if (this.state.selected >= 0) {
      let newSelected = this.state.selected + amount;
      if (newSelected < 0) {
        newSelected = this.state.initiative.order.length;
      } else if (newSelected > this.state.initiative.order.length) {
        newSelected = 0;
      }
      this.initiativeController.moveCombatant(
          this.state.initiative.order[this.state.selected], newSelected, false);
    }
  }

  render() {
    return (
      <CombatPane title="Initiative Tracker" smallMode={this.props.smallMode}>
        <ButtonPanel>
          <Button
            grow
            onClick={() => {
              this.initiativeController.rollInitiative();
            }}
          ><i className="fa fa-random fa-2x" aria-hidden="true" />Roll Initiative</Button>
          <div style={{ display: "flex", flexDirection: "column", flexBasis: "content" }}>
            <Button
              onClick={() => {
                this.initiativeController.sortInitiative();
              }}
            ><i className="fa fa-sort-numeric-desc" aria-hidden="true" />Sort</Button>
            <Button
              onClick={() => {
                this.initiativeController.resetInitiative();
              }}
            ><i className="fa fa-undo" aria-hidden="true" />Reset</Button>
          </div>
        </ButtonPanel>
        <CombatantListContainer
          combatantsController={this.props.combatantsController}
          combatantType={INITIATIVE}
          initController={this.initiativeController}
          selected={this.state.selected}
          changeSelection={this.changeSelection}
        />
        <ButtonPanel>
          <Button
            style={{ flexBasis: "content" }}
            onClick={() => { this.initiativeController.prevTurn(); }}
          >
            <i className="fa fa-arrow-left fa-lg" aria-hidden="true" />Prev Turn</Button>
          <Button
            grow
            onClick={() => { this.initiativeController.nextTurn(); }}
          >
            Next Turn<i className="fa fa-arrow-right fa-2x" aria-hidden="true" /></Button>
          <ButtonPanel vertical>
            <Button onClick={() => this.shiftSelection(-1)}>
              <i className="fa fa-arrow-up" />
            </Button>
            <Button onClick={() => this.shiftSelection(1)}>
              <i className="fa fa-arrow-down" />
            </Button>
          </ButtonPanel>
        </ButtonPanel>
      </CombatPane>
    );
  }
}

InitiativeTracker.propTypes = {
  activeCombatants: PropTypes.arrayOf(PropTypes.instanceOf(CombatantModel)).isRequired,
  combatantsController: PropTypes.instanceOf(CombatantsController).isRequired,
  smallMode: PropTypes.bool.isRequired,
    //combatantsController: PropTypes.object.isRequired,
};

export default InitiativeTracker;
