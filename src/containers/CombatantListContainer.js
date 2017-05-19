import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CombatantList from '../components/CombatantList';
import {CombatantType} from "../CombatantType";
import CombatantModel from "../models/CombatantModel";

class CombatantListContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selected: -1
        };
        this.changeSelection = this.changeSelection.bind(this);
    }

    changeSelection(index) {
        this.setState({selected: (this.state.selected === index ? -1 : index)});
    }

    render() {
        return (
            <CombatantList
                combatants={this.props.combatants}
                combatantType={this.props.combatantType}
                selected={this.state.selected}
                onClick={this.changeSelection}
            />
        );
    }
}

CombatantListContainer.propTypes = {
    combatants: PropTypes.arrayOf(PropTypes.instanceOf(CombatantModel)).isRequired,
    combatantType: PropTypes.instanceOf(CombatantType).isRequired
};

export default CombatantListContainer;