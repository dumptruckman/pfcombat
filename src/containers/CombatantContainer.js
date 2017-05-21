import React, { Component } from 'react';
import Combatant from '../components/Combatant';
import PropTypes from 'prop-types';
import CombatantModel from "../models/CombatantModel";
import {CombatantType} from "../CombatantType";
import CombatantsController from "../controllers/CombatantsController";
import InitiativeController from "../controllers/InitiativeController";

class CombatantContainer extends Component {

    render() {
        return (
            <Combatant
                index={this.props.index}
                combatant={this.props.combatant}
                combatantType={this.props.combatantType}
                selected={this.props.selected}
                onClick={this.props.onClick}
                combatantsController={this.props.combatantsController}
                initController={this.props.initController}
            />
        );
    }
}

CombatantContainer.propTypes = {
    index: PropTypes.number.isRequired,
    combatant: PropTypes.instanceOf(CombatantModel).isRequired,
    combatantType: PropTypes.instanceOf(CombatantType).isRequired,
    selected: PropTypes.bool,
    onClick: PropTypes.func.isRequired,
    combatantsController: PropTypes.instanceOf(CombatantsController).isRequired,
    initController: PropTypes.instanceOf(InitiativeController)
};

export default CombatantContainer;