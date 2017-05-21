import React, { Component } from 'react';
import './App.css';
import InitiativeTracker from "./components/InitiativeTracker";
import PartyEditor from "./components/PartyEditor";
import EnemyEditor from "./components/EnemyEditor";
import CombatantsController from "./controllers/CombatantsController";

class App extends Component {

    constructor() {
        super();
        this.state = {
            combatants: []
        };
        this.combatantsController.updateCombatant = this.combatantsController.updateCombatant.bind(this);
        this.combatantsController.updateCombatants = this.combatantsController.updateCombatants.bind(this);
        this.combatantsController.getParty = this.combatantsController.getParty.bind(this);
        this.combatantsController.getEnemies = this.combatantsController.getEnemies.bind(this);
        this.combatantsController.getActiveCombatants = this.combatantsController.getActiveCombatants.bind(this);
        this.combatantsController.getAllCombatants = this.combatantsController.getAllCombatants.bind(this);
        this.combatantsController.getCombatant = this.combatantsController.getCombatant.bind(this);
    }

    combatantsController = new CombatantsController();

    componentWillMount() {
        let combatants = [];
        combatants.push(this.combatantsController.createCombatant(true, combatants));
        combatants.push(this.combatantsController.createCombatant(true, combatants));
        combatants.push(this.combatantsController.createCombatant(false, combatants));
        combatants.push(this.combatantsController.createCombatant(false, combatants));
        combatants.push(this.combatantsController.createCombatant(false, combatants));
        this.setState({
            combatants: combatants
        });
    }

    render() {
        return (
            <div id="combat-tab" className="tab">
                <InitiativeTracker combatantsController={this.combatantsController} />
                <PartyEditor combatantsController={this.combatantsController} />
                <EnemyEditor combatantsController={this.combatantsController} />
            </div>
        );
    }
}



export default App;
