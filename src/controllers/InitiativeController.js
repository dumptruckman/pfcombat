import CombatantModel from "../models/CombatantModel";

class InitiativeController {

  constructor() {
    // defined here to remove warnings in IDE though all
    // methods using this.state are rebound in InitiativeTracker.js
    this.state = undefined;
    this.setState = undefined;
    this.props = undefined;
    this.initiativeController = undefined;
  }

  static getRandomInt(minimum, maximum) {
    const min = Math.ceil(minimum);
    const max = Math.floor(maximum);
    return Math.floor(Math.random() * (max - min)) + min;
  }

  getCombatantCount() {
    return this.state.initiative.order.length;
  }

  getInitIndex(combatant) {
    return this.state.initiative.order.indexOf(combatant.id);
  }

  updateTurnIndex(newIndex) {
    this.setState(prevState => ({
      initiative: {
        ...prevState.initiative,
        turnIndex: newIndex,
      },
    }));
  }

  moveCombatant(id, newIndex, takeInit = true) {
    const oldIndex = this.state.initiative.order.findIndex(i => i === id);
    if (oldIndex < 0 || newIndex < 0) {
      return;
    }

    this.setState((prevState) => {
      const newOrder = [...prevState.initiative.order];
      newOrder.splice(oldIndex, 1);
      newOrder.splice((newIndex > oldIndex && takeInit) ? newIndex - 1 : newIndex, 0, id);
      let newSelected = prevState.selected === oldIndex ? newIndex : prevState.selected;
      newSelected = (newIndex > oldIndex && takeInit) ? newSelected - 1 : newSelected;
      let newTurnIndex = (newIndex > oldIndex && takeInit) ?
          prevState.initiative.turnIndex - 1 : prevState.initiative.turnIndex;
      newTurnIndex = prevState.initiative.turnIndex < 0 ? -1 : newTurnIndex;
      return {
        initiative: {
          ...prevState.initiative,
          order: newOrder,
          turnIndex: newTurnIndex,
        },
        selected: newSelected,
      };
    });
  }

  updateRoundCount(round) {
    this.setState(prevState => ({
      initiative: {
        ...prevState.initiative,
        roundCount: round,
      },
    }));
  }

  rollInitiative() {
    this.initiativeController.resetInitiative();
    const newCombatants = [];
    this.props.combatantsController.getAllCombatants().forEach((combatant) => {
      let newCombatant;
      if (combatant.inCombat) {
        const roll = InitiativeController.getRandomInt(1, 21);
        newCombatant = new CombatantModel(combatant);
        const initMod = combatant.getInitMod();
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
    const initOrder = [];
    const activeCombatants = prevCombatants.filter(c => c.inCombat).sort((a, b) => {
      let res = b.getInitiative() - a.getInitiative();
      if (res === 0) {
        res = b.getInitMod() - a.getInitMod();
      }
      return res;
    });
    activeCombatants.forEach((combatant) => {
      initOrder.push(combatant.id);
    });
    this.setState(prevState => ({
      initiative: {
        ...prevState.initiative,
        order: initOrder,
      },
    }));
  }

  nextTurn() {
    let init = this.state.initiative.turnIndex;
    if (init < 0) {
      init = 0;
    } else {
      init += 1;
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
      init -= 1;
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
    const newCombatants = [];
    this.props.combatantsController.getActiveCombatants().forEach((c) => {
      const newCombatant = new CombatantModel(c);
      newCombatant.initiative = 0;
      newCombatants.push(newCombatant);
    });
    this.setState(prevState => ({
      initiative: {
        ...prevState.initiative,
        turnIndex: -1,
        roundCount: 0,
      },
    }));
    this.props.combatantsController.updateCombatants(newCombatants);
  }
}

export default InitiativeController;
