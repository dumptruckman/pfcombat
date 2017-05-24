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
    let i = 1;
    let name = (party ? "Player " : "Monster ");
    while (true) {
      const combatant = this.combatantsController.getCombatantByName(name + i, combatants);
      if (combatant === undefined || combatant === null) {
        name += i;
        break;
      } else {
        i += 1;
      }
    }
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
    for (const key in combatants) {
        // for (let i = 0; i < combatants.length; i++) {
      const combatant = combatants[key];
      if (combatant.name === name) {
        return combatant;
      }
    }
    return undefined;
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
    c[propName] = value;
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
