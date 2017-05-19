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
                new CombatantModel("Orc 1", true), new CombatantModel("Orc 2", true),
                new CombatantModel("Orc Chieftan", true)]
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
