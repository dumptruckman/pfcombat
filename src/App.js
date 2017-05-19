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
    }

    render() {

        return (
            <div id="combat-tab" className="tab">
                <InitiativeTracker combatants={this.state.combatants} />
                <PartyEditor party={this.state.combatants} />
                <EnemyEditor enemies={this.state.combatants} />
            </div>
        );
    }
}

export default App;
