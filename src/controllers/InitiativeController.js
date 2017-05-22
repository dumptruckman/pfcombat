import CombatantModel from "../models/CombatantModel";
class InitiativeController {

    // defined here to remove warnings in IDE though all methods using this.state are rebound in InitiativeTracker.js
    state;
    setState;
    props;
    initiativeController;

    rollInitiative() {
        this.initiativeController.resetInitiative();
        let newCombatants = [];
        this.props.combatantsController.getAllCombatants().forEach((combatant) => {
            let newCombatant;
            if (combatant.inCombat) {
                let roll = this.getRandomInt(1, 21);
                newCombatant = new CombatantModel(combatant);
                let initMod = combatant.initMod;
                initMod = parseInt(initMod, 10);
                if (isNaN(initMod)) {
                    initMod = 0;
                }
                newCombatant.initiative = roll + initMod;
            } else {
                newCombatant = new CombatantModel(combatant);
            }
            newCombatants.push(newCombatant);
        });
        this.initiativeController.sortInitiative(newCombatants);
    }

    sortInitiative(prevCombatants = this.props.combatantsController.getAllCombatants()) {
        let combatantsArray = [];
        let activeCombatants = prevCombatants.filter(c => c.inCombat).sort((a, b) => b.initiative - a.initiative);
        let i = 0;
        prevCombatants.forEach(combatant => {
            if (combatant.inCombat) {
                combatantsArray.splice(i, 1, new CombatantModel(activeCombatants[i]));
                i++;
            } else {
                combatantsArray.splice(i, 1, new CombatantModel(combatant));
            }
        });
        let newCombatants = {};
        combatantsArray.forEach(c => {newCombatants[c.id] = c});
        this.props.combatantsController.updateCombatants(newCombatants);
    }

    nextTurn() {
        let init = this.state.initiative.turnIndex;
        if (init < 0) {
            init = 0;
        } else {
            init++;
            if (init >= this.getCombatantCount()) {
                init = 0;
            }
        }
        this.updateTurnIndex(init);
    }

    prevTurn() {
        let init = this.state.initiative.turnIndex;
        if (init < 0) {
            init = this.getCombatantCount() - 1;
        } else {
            init--;
            if (init < 0) {
                init = this.getCombatantCount() - 1;
            }
        }
        this.updateTurnIndex(init);
    }

    getTurnIndex() {
        return this.state.initiative.turnIndex;
    }

    resetInitiative() {
        let newCombatants = {};
        this.props.combatantsController.getActiveCombatants().forEach(c => {
            c = new CombatantModel(c);
            c.initiative = 0;
            newCombatants = {
                ...newCombatants,
                [c.id]: c
            };
        });
        this.props.combatantsController.updateCombatants(newCombatants);
        this.setState({
            ...this.state,
            turnIndex: -1,
            roundCount: 0
        });
    }
}

export default InitiativeController;