import React, { Component } from 'react';
import './App.css';
import CombatantModel from "./models/CombatantModel";
import InitiativeTracker from "./components/InitiativeTracker";
import PartyEditor from "./components/PartyEditor";
import EnemyEditor from "./components/EnemyEditor";

class App extends Component {
    render() {
        let party = [new CombatantModel("Johnny"), new CombatantModel("Linus")];
        let enemies = [new CombatantModel("Orc 1"), new CombatantModel("Orc 2"), new CombatantModel("Orc Chieftan")];
        let combatants = party.concat(enemies);
        return (
            <div id="combat-tab" className="tab">
                <InitiativeTracker combatants={combatants} />
                <PartyEditor party={party} />
                <EnemyEditor enemies={enemies} />
            </div>
        );
    }
}

export default App;
