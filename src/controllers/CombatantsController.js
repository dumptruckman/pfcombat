import CombatantModel from "../models/CombatantModel";

class CombatantsController {

    state; // defined here to remove warnings in IDE though all methods using this.state are rebound in App.js

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

    getCombatant(index) {
        return this.state.combatants[index];
    }

    getParty() {
        return this.state.combatants.filter(c => c.isParty);
    }

    getEnemies() {
        return this.state.combatants.filter(c => !c.isParty);
    }

    getActiveCombatants() {
        return this.state.combatants.filter(c => c.inCombat);
    }

    getAllCombatants() {
        return this.state.combatants;
    }
}

export default CombatantsController;