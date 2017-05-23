import CombatantModel from "../models/CombatantModel";

class CombatantsController {

    // defined here to remove warnings in IDE though all methods using this.state are rebound in App.js
    state;
    setState;
    combatantsController;

    createCombatant(party, combatants = this.state.combatants) {
        let i = 1;
        let name = (party ? "Player " : "Monster ");
        while (true) {
            let combatant = this.combatantsController.getCombatantByName(name + i, combatants);
            if (combatant === undefined) {
                name += i;
                break;
            } else {
                i++;
            }
        }
        return new CombatantModel(name, party);
    }

    addCombatant(party) {
        let combatant = this.combatantsController.createCombatant(party);
        this.setState(prevState => { return {
            combatants: {
                ...this.state.combatants,
                [combatant.id]: combatant
            }
        }});
    }

    removeCombatant(id) {
        let newCombatants = { ...this.state.combatants };
        delete newCombatants[id];
        this.setState({
            combatants: newCombatants
        });
    }

    removeCombatants(party) {
        Object.values(this.state.combatants).filter(c => c.isParty === party).forEach(c => this.combatantsController.removeCombatant(c.id));
    }

    getCombatantByName(name, combatants = this.state.combatants) {
        for (let key in combatants) {
        //for (let i = 0; i < combatants.length; i++) {
            let combatant = combatants[key];
            if (combatant.name === name) {
                return combatant;
            }
        }
    }

    getCombatantById(id) {
        return this.state.combatants[id];
    }

    updateCombatants(newCombatants) {
        let combatants = {...this.state.combatants};
        for (let i = 0; i < newCombatants.length; i++) {
            combatants[newCombatants[i].id] = newCombatants[i];
        }
        this.setState({
            combatants: combatants
        });
    }

    updateCombatant(combatant) {
        this.setState(prevState => { return {
            combatants: {
                ...prevState.combatants,
                [combatant.id]: combatant
            }
        }});
    }

    setCombatantProp(combatant, propName, value) {
        let c = new CombatantModel(combatant);
        c[propName] = value;
        this.setState(prevState => { return {
            combatants: {
                ...prevState.combatants,
                [c.id]: c
            }
        }});
    }

    getCombatant(index) {
        return Object.values(this.state.combatants)[index];
    }

    getParty() {
        return Object.values(this.state.combatants).filter(c => c.isParty);
    }

    getEnemies() {
        return Object.values(this.state.combatants).filter(c => !c.isParty);
    }

    getActiveCombatants() {
        return Object.values(this.state.combatants).filter(c => c.inCombat);
    }

    getAllCombatants() {
        return Object.values(this.state.combatants);
    }

    showCurrentHpDialog(combatant) {
        this.setState({
            currentModal: "CURRENT_HP",
            modalTarget: combatant.id
        });
    }
}

export default CombatantsController;