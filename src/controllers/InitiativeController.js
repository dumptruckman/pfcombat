import CombatantModel from "../models/CombatantModel";
class InitiativeController {
    rollInitiative() {
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
        let newCombatants = [];
        let activeCombatants = prevCombatants.filter(c => c.inCombat).sort((a, b) => b.initiative - a.initiative);
        let i = 0;
        prevCombatants.forEach(combatant => {
            if (combatant.inCombat) {
                newCombatants.splice(i, 1, new CombatantModel(activeCombatants[i]));
                i++;
            } else {
                newCombatants.splice(i, 1, new CombatantModel(combatant));
            }
        });
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
}

export default InitiativeController;