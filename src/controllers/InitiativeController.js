import CombatantModel from "../models/CombatantModel";
class InitiativeController {

    // defined here to remove warnings in IDE though all methods using this.state are rebound in InitiativeTracker.js
    state;
    setState;
    props;
    initiativeController;

    static getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }

    getCombatantCount() {
        return this.state.initiative.order.length;
    }

    getInitIndex(combatant) {
        return this.state.initiative.order.indexOf(combatant.id);
    }

    updateTurnIndex(newIndex) {
        this.setState({
            initiative: {
                ...this.state.initiative,
                turnIndex: newIndex
            }
        })
    }

    updateRoundCount(round) {
        this.setState({
            initiative: {
                ...this.state.initiative,
                roundCount: round
            }
        })
    }

    rollInitiative() {
        this.initiativeController.resetInitiative();
        let newCombatants = [];
        this.props.combatantsController.getAllCombatants().forEach((combatant) => {
            let newCombatant;
            if (combatant.inCombat) {
                let roll = InitiativeController.getRandomInt(1, 21);
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
        this.props.combatantsController.updateCombatants(newCombatants);
        this.initiativeController.sortInitiative(newCombatants);
    }

    sortInitiative(prevCombatants = this.props.combatantsController.getAllCombatants()) {
        let initOrder = [];
        let activeCombatants = prevCombatants.filter(c => c.inCombat).sort((a, b) => {
            let res = b.initiative - a.initiative;
            if (res === 0) {
                res = b.initMod - a.initMod;
            }
            return res;
        });
        activeCombatants.forEach(combatant => {
            initOrder.push(combatant.id);
        });
        this.setState({
            initiative: {
                ...this.state.initiative,
                order: initOrder
            }
        })
    }

    nextTurn() {
        let init = this.state.initiative.turnIndex;
        if (init < 0) {
            init = 0;
        } else {
            init++;
            if (init >= this.initiativeController.getCombatantCount()) {
                init = 0;
            }
        }
        this.initiativeController.updateTurnIndex(init);
    }

    prevTurn() {
        let init = this.state.initiative.turnIndex;
        if (init < 0) {
            init = this.initiativeController.getCombatantCount() - 1;
        } else {
            init--;
            if (init < 0) {
                init = this.initiativeController.getCombatantCount() - 1;
            }
        }
        this.initiativeController.updateTurnIndex(init);
    }

    getTurnIndex() {
        return this.state.initiative.turnIndex;
    }

    resetInitiative() {
        let newCombatants = [];
        this.props.combatantsController.getActiveCombatants().forEach(c => {
            c = new CombatantModel(c);
            c.initiative = 0;
            newCombatants.push(c);
        });
        this.setState({
            initiative: {
                ...this.state.initiative,
                turnIndex: -1,
                roundCount: 0
            }
        });
        this.props.combatantsController.updateCombatants(newCombatants);
    }
}

export default InitiativeController;