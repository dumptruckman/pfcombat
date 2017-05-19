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
            party: [new CombatantModel("Johnny"), new CombatantModel("Linus")],
            enemies: [new CombatantModel("Orc 1"), new CombatantModel("Orc 2"), new CombatantModel("Orc Chieftan")],
            combatants: []
        }
    }

    componentWillMount() {
        this.setState({combatants: this.state.party.concat(this.state.enemies)});
    }

    render() {

        return (
            <div id="combat-tab" className="tab">
                <InitiativeTracker combatants={this.state.combatants} />
                <PartyEditor party={this.state.party} />
                <EnemyEditor enemies={this.state.enemies} />
            </div>
        );
    }
}

export default App;
