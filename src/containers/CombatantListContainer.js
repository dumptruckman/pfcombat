import React, { Component } from "react";
import PropTypes from "prop-types";
import CombatantList from "../components/CombatantList";
import { CombatantType, ENEMY, INITIATIVE, PARTY } from "../CombatantType";
import CombatantsController from "../controllers/CombatantsController";
import InitiativeController from "../controllers/InitiativeController";

class CombatantListContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selected: -1,
    };
    this.changeSelection = this.changeSelection.bind(this);
  }

  changeSelection(index) {
    if (this.props.changeSelection !== null) {
      this.props.changeSelection(index);
    } else {
      this.setState(prevState => ({
        selected: (prevState.selected === index ? -1 : index),
      }));
    }
  }

  render() {
    let combatants = this.props.combatantsController.getAllCombatants().filter(combatant => (
      (this.props.combatantType === INITIATIVE && combatant.inCombat)
      || (this.props.combatantType === ENEMY && !combatant.isParty)
      || (this.props.combatantType === PARTY && combatant.isParty)
    ));
    if (this.props.combatantType === INITIATIVE) {
      combatants = combatants.sort((a, b) => this.props.initController.getInitIndex(a)
            - this.props.initController.getInitIndex(b));
    }
    return (
      <CombatantList
        combatants={combatants}
        combatantsController={this.props.combatantsController}
        combatantType={this.props.combatantType}
        selected={this.props.selected !== null ? this.props.selected : this.state.selected}
        onClick={this.changeSelection}
        initController={this.props.initController}
      />
    );
  }
}

CombatantListContainer.propTypes = {
  combatantsController: PropTypes.instanceOf(CombatantsController).isRequired,
  combatantType: PropTypes.instanceOf(CombatantType).isRequired,
  initController: PropTypes.instanceOf(InitiativeController),
  changeSelection: PropTypes.func,
  selected: PropTypes.number,
};

CombatantListContainer.defaultProps = {
  initController: undefined,
  changeSelection: null,
  selected: null,
};

export default CombatantListContainer;
