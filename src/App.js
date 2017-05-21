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
            combatants: []
        };
        this.combatantsController.updateCombatant = this.combatantsController.updateCombatant.bind(this);
        this.combatantsController.updateCombatants = this.combatantsController.updateCombatants.bind(this);
    }

    combatantsController = new CombatantController();

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
                <InitiativeTracker combatants={this.state.combatants} updateCombatant={this.combatantsController.updateCombatant}
                                   updateCombatants={this.combatantsController.updateCombatants}/>
                <PartyEditor party={this.state.combatants} updateCombatant={this.combatantsController.updateCombatant} />
                <EnemyEditor enemies={this.state.combatants} updateCombatant={this.combatantsController.updateCombatant} />
            </div>
        );
    }
}

export class CombatantController {
    createCombatant(party, combatants = this.state.combatants) {
        let i = 1;
        let name = (party ? "Player " : "Monster ");
        while (true) {
            let combatant = this.getCombatantByName(name + i, combatants);
            if (combatant === undefined) {
                name += i;
                break;
            } else {
                i++;
            }
        }
        return new CombatantModel(name, party);
    }

    getCombatantByName(name, combatants = this.state.combatants) {
        for (let i = 0; i < combatants.length; i++) {
            if (combatants[i].name === name) {
                return combatants[i];
            }
        }
    }

    updateCombatants(newCombatants) {
        this.setState({
                combatants: newCombatants
            },
        );
    }

    updateCombatant(index, combatant) {
        this.setState({
            combatants: [
                ...this.state.combatants.slice(0, index),
                combatant,
                ...this.state.combatants.slice(index+1)
            ]
        });
    }
}

export default App;
