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
                updateCombatant={this.props.updateCombatant}
                initController={this.props.initController}
            />
        );
    }
}

CombatantListContainer.propTypes = {
    combatants: PropTypes.arrayOf(PropTypes.instanceOf(CombatantModel)).isRequired,
    combatantType: PropTypes.instanceOf(CombatantType).isRequired,
    updateCombatant: PropTypes.func.isRequired,
    initController: PropTypes.shape({
        nextTurn: PropTypes.func.isRequired,
        prevTurn: PropTypes.func.isRequired,
        getTurnIndex: PropTypes.func.isRequired
    })
};

export default CombatantListContainer;