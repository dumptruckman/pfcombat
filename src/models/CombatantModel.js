import { generate } from "shortid";

class CombatantModel {
  constructor(name, party) {
    if (typeof name === "object" && party === undefined) {
      if (name.name === undefined || name.name === null) {
        throw new SyntaxError("New combatant missing name prop");
      }
      if (name.isParty === undefined || name.isParty === null) {
        throw new SyntaxError("New combatant missing party prop");
      }
      this.name = name.name;
      this.isParty = name.isParty;
      this.initMod = name.initMod !== undefined ? name.initMod : 0;
      this.initiative = name.initiative !== undefined ? name.initiative : 0;
      this.maxHp = name.maxHp !== undefined ? name.maxHp : 5;
      this.currentHp = name.currentHp !== undefined ? name.currentHp : 5;
      this.tempHp = name.tempHp !== undefined ? name.tempHp : 0;
      this.nonlethalDamage = name.nonlethalDamage !== undefined ? name.nonlethalDamage : 0;
      this.inCombat = name.inCombat !== undefined ? name.inCombat : false;
      this.id = name.id !== undefined ? name.id : generate();
      this.ready = name.ready !== undefined ? name.ready : false;
      this.delay = name.delay !== undefined ? name.delay : false;
    } else {
      this.name = name;
      this.isParty = party;
      this.initMod = 0;
      this.initiative = 0;
      this.maxHp = 5;
      this.currentHp = 5;
      this.tempHp = 0;
      this.nonlethalDamage = 0;
      this.inCombat = false;
      this.id = generate();
      this.ready = false;
      this.delay = false;
    }
  }
}

export default CombatantModel;
