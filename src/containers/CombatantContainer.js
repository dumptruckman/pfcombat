import React, { Component } from 'react';
import Combatant from '../components/Combatant';
import PropTypes from 'prop-types';

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
    combatant: PropTypes.object.isRequired
};

export default CombatantContainer;