import CombatantModel from "../models/CombatantModel";

class CombatantsController {

  constructor() {
    // defined here to remove warnings in IDE though all methods
    // using this.state are rebound in App.js
    this.state = undefined;
    this.setState = undefined;
    this.combatantsController = undefined;
  }

  createCombatant(party, combatants = this.state.combatants) {
    let i = 0;
    let name = (party ? "Player " : "Monster ");
    let combatant;
    do {
      i += 1;
      combatant = this.combatantsController.getCombatantByName(name + i, combatants);
    } while (combatant !== null);
    name += i;
    return new CombatantModel(name, party);
  }

  addBlankCombatant(party) {
    const combatant = this.combatantsController.createCombatant(party);
    this.combatantsController.addCombatant(combatant);
  }

  addCombatant(combatant) {
    this.setState((prevState) => {
      const newCombatants = new Map(prevState.combatants);
      newCombatants.set(combatant.id, combatant);
      return {
        combatants: newCombatants,
      };
    });
  }

  removeCombatant(id) {
    this.setState((prevState) => {
      const newCombatants = new Map(prevState.combatants);
      newCombatants.delete(id);
      return {
        combatants: newCombatants,
      };
    });
  }

  removeCombatants(party) {
    this.setState((prevState) => {
      const newCombatants = new Map(prevState.combatants);
      [...prevState.combatants.entries()].forEach(([key, value]) => {
        if (value.isParty === party) {
          newCombatants.delete(key);
        }
      });
      return {
        combatants: newCombatants,
      };
    });
  }

  getCombatantByName(name, combatants = this.state.combatants) {
    let res = null;
    combatants.forEach((combatant) => {
      if (combatant.name === name) {
        res = combatant;
      }
    });
    return res;
  }

  getCombatantById(id) {
    return this.state.combatants.get(id);
  }

  updateCombatants(newCombatants) {
    this.setState((prevState) => {
      const combatants = new Map(prevState.combatants);
      newCombatants.forEach(c => combatants.set(c.id, c));
      return {
        combatants,
      };
    });
  }

  updateCombatant(combatant) {
    this.setState((prevState) => {
      const combatants = new Map(prevState.combatants);
      combatants.set(combatant.id, combatant);
      return {
        combatants,
      };
    });
  }

  setCombatantProp(combatant, propName, value) {
    const c = new CombatantModel(combatant);
    c[propName] = value;
    this.combatantsController.updateCombatant(c);
  }

  getCombatant(index) {
    return [...this.state.combatants.values()][index];
  }

  getParty() {
    return [...this.state.combatants.values()].filter(c => c.isParty);
  }

  getEnemies() {
    return [...this.state.combatants.values()].filter(c => !c.isParty);
  }

  getActiveCombatants() {
    return [...this.state.combatants.values()].filter(c => c.inCombat);
  }

  getAllCombatants() {
    return [...this.state.combatants.values()];
  }

  showCurrentHpDialog(combatant) {
    this.setState({
      currentModal: "CURRENT_HP",
      modalTarget: combatant.id,
    });
  }

  makeAllIdle(combatants) {
    this.combatantsController.updateCombatants(combatants.map((c) => {
      const combatant = new CombatantModel(c);
      combatant.inCombat = false;
      combatant.initiative = 0;
      return combatant;
    }));
  }

  makeAllActive(combatants) {
    this.combatantsController.updateCombatants(combatants.map((c) => {
      const combatant = new CombatantModel(c);
      combatant.inCombat = true;
      return combatant;
    }));
  }
}

export default CombatantsController;
