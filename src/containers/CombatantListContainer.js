import React, { Component } from 'react';
import CombatantList from '../components/CombatantList';
import CombatantContainer from './CombatantContainer';

class CombatantListContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            combatants: [
                { name: "Jules" },
                { name: "Ogdon" }
            ]
        }
    }

    render() {
        return <CombatantList combatants={this.state.combatants.map(function(combatant) {
            return <CombatantContainer key={combatant.name} combatant={combatant} />;
        })}/>
    }
}

export default CombatantListContainer;