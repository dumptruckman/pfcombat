import React, { Component } from 'react';
import Combatant from '../components/Combatant';
import PropTypes from 'prop-types';
import CombatantModel from "../models/CombatantModel";
import {CombatantType} from "../CombatantType";

class CombatantContainer extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Combatant
                combatant={this.props.combatant}
                combatantType={this.props.combatantType}
                selected={this.props.selected} />
        );
    }
}

CombatantContainer.propTypes = {
    combatant: PropTypes.instanceOf(CombatantModel).isRequired,
    combatantType: PropTypes.instanceOf(CombatantType).isRequired,
    selected: PropTypes.bool
};

export default CombatantContainer;