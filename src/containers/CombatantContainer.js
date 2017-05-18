import React, { Component } from 'react';
import Combatant from '../components/Combatant';
import PropTypes from 'prop-types';
import CombatantPropType from '../models/CombatantModel';

class CombatantContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            combatant: this.props.combatant
        }
    }

    render() {
        return <Combatant combatant={this.state.combatant} />;
    }
}

CombatantContainer.propTypes = {
    combatant: CombatantPropType
};

export default CombatantContainer;