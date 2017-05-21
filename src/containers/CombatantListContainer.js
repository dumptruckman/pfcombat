import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CombatantList from '../components/CombatantList';
import {CombatantType} from "../CombatantType";
import CombatantsController from "../controllers/CombatantsController";

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
                combatantsController={this.props.combatantsController}
                combatantType={this.props.combatantType}
                selected={this.state.selected}
                onClick={this.changeSelection}
                initController={this.props.initController}
            />
        );
    }
}

CombatantListContainer.propTypes = {
    combatantsController: PropTypes.instanceOf(CombatantsController).isRequired,
    combatantType: PropTypes.instanceOf(CombatantType).isRequired,
    initController: PropTypes.shape({
        nextTurn: PropTypes.func.isRequired,
        prevTurn: PropTypes.func.isRequired,
        getTurnIndex: PropTypes.func.isRequired
    })
};

export default CombatantListContainer;