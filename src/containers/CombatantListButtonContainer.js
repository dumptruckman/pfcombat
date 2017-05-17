import React, { Component } from 'react';
import Combatant from '../components/Combatant';
import PropTypes from 'prop-types';
import CombatantListButton from "../components/CombatantListButton";

class CombatantListButtonContainer extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return <CombatantListButton text={this.props.text} />;
    }
}

CombatantListButtonContainer.propTypes = {
    text: PropTypes.string
};

export default CombatantListButtonContainer;