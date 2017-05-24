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

  addCombatant(party) {
    const combatant = this.combatantsController.createCombatant(party);
    this.setState(prevState => ({
      combatants: {
        ...prevState.combatants,
        [combatant.id]: combatant,
      },
    }));
  }

  removeCombatant(id) {
    const newCombatants = { ...this.state.combatants };
    delete newCombatants[id];
    this.setState({
      combatants: newCombatants,
    });
  }

  removeCombatants(party) {
    Object.values(this.state.combatants).filter(c => c.isParty === party)
        .forEach(c => this.combatantsController.removeCombatant(c.id));
  }

  getCombatantByName(name, combatants = this.state.combatants) {
    let res = null;
    Object.values(combatants).forEach((combatant) => {
      if (combatant.name === name) {
        res = combatant;
      }
    });
    return res;
  }

  getCombatantById(id) {
    return this.state.combatants[id];
  }

  updateCombatants(newCombatants) {
    const combatants = { ...this.state.combatants };
    for (let i = 0; i < newCombatants.length; i += 1) {
      combatants[newCombatants[i].id] = newCombatants[i];
    }
    this.setState({
      combatants,
    });
  }

  updateCombatant(combatant) {
    this.setState(prevState => ({
      combatants: {
        ...prevState.combatants,
        [combatant.id]: combatant,
      },
    }));
  }

  setCombatantProp(combatant, propName, value) {
    const c = new CombatantModel(combatant);
    let v = value;
    if (!isNaN(c[propName])) {
      v = parseInt(v, 10);
      if (isNaN(v)) {
        v = 0;
      }
    }

    c[propName] = v;
    this.setState(prevState => ({
      combatants: {
        ...prevState.combatants,
        [c.id]: c,
      },
    }));
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
      modalTarget: combatant.id,
    });
  }
}

export default CombatantsController;
