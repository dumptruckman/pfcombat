import React, { Component } from "react";
import PropTypes from "prop-types";
import Combatant from "../components/Combatant";
import CombatantModel from "../models/CombatantModel";
import {CombatantType, INITIATIVE} from "../CombatantType";
import CombatantsController from "../controllers/CombatantsController";
import InitiativeController from "../controllers/InitiativeController";
import InitiativeCombatantHeader from "../components/InitiativeCombatantHeader";
import EditorCombatantHeader from "../components/EditorCombatantHeader";

class CombatantContainer extends Component {

  componentWillReceiveProps(nextProps) {
    let combatant = nextProps.combatant;
    if (combatant.inCombat && nextProps.initController) {
      if (nextProps.initController.getTurnIndex()
          === nextProps.initController.getInitIndex(combatant)) {
        if (combatant.delay || combatant.ready) {
          combatant = new CombatantModel(combatant);
          combatant.delay = false;
          combatant.ready = false;
          this.props.combatantsController.updateCombatant(combatant);
        }
      } else {
        // const prevCombatant = this.props.combatant;
        // if (prevCombatant.delay !== combatant.delay || prevCombatant.ready !== combatant.ready) {
        //   nextProps.initController.updateTurnIndex(
        //       this.props.initController.getInitIndex(combatant));
        // }
      }
    }
  }

  render() {
    return (<Combatant
      header={this.props.combatantType === INITIATIVE
        ? <InitiativeCombatantHeader
          combatantsController={this.props.combatantsController}
          combatant={this.props.combatant}
        />
        : <EditorCombatantHeader
          combatantsController={this.props.combatantsController}
          combatant={this.props.combatant}
        />}
      {...this.props}
    />);
  }
}

CombatantContainer.propTypes = {
  index: PropTypes.number.isRequired,
  combatant: PropTypes.instanceOf(CombatantModel).isRequired,
  combatantType: PropTypes.instanceOf(CombatantType).isRequired,
  selected: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  combatantsController: PropTypes.instanceOf(CombatantsController).isRequired,
  initController: PropTypes.instanceOf(InitiativeController),
};

CombatantContainer.defaultProps = {
  selected: false,
  initController: undefined,
};

export default CombatantContainer;
