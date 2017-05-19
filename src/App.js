import React, { Component } from 'react';
import './App.css';
import CombatantModel from "./models/CombatantModel";
import InitiativeTracker from "./components/InitiativeTracker";
import PartyEditor from "./components/PartyEditor";
import EnemyEditor from "./components/EnemyEditor";

class App extends Component {

    constructor() {
        super();
        this.state = {
            combatants: [new CombatantModel("Johnny", true), new CombatantModel("Linus", true),
                new CombatantModel("Orc 1", false), new CombatantModel("Orc 2", false),
                new CombatantModel("Orc Chieftan", false)]
        }
        this.updateCombatant = this.updateCombatant.bind(this);
    }

    updateCombatant(index, combatant) {
        this.setState({
            ...this.state,
            combatants: [
                ...this.state.combatants.slice(0, index),
                combatant,
                ...this.state.combatants.slice(index+1)
            ]
        });
    }

    render() {
        return (
            <div id="combat-tab" className="tab">
                <InitiativeTracker combatants={this.state.combatants} updateCombatant={this.updateCombatant} />
                <PartyEditor party={this.state.combatants} updateCombatant={this.updateCombatant} />
                <EnemyEditor enemies={this.state.combatants} updateCombatant={this.updateCombatant} />
            </div>
        );
    }
}

export default App;
