import {generate} from "shortid";

class CombatantModel {
    constructor(name, party) {
        if (name instanceof CombatantModel && party === undefined) {
            this.name = name.name;
            this.isParty = name.isParty;
            this.initMod = name.initMod;
            this.initiative = name.initiative;
            this.maxHp = name.maxHp;
            this.currentHp = name.currentHp;
            this.tempHp = name.tempHp;
            this.nonlethalDamage = name.nonlethalDamage;
            this.inCombat = name.inCombat;
            this.id = name.id;
            this.ready = name.ready;
            this.delay = name.delay;
        } else {
            this.name = name;
            this.isParty = party;
            this.initMod = 0;
            this.initiative = 0;
            this.maxHp = 5;
            this.currentHp = 5;
            this.tempHp = 0;
            this.nonlethalDamage = 0;
            this.inCombat = true;
            this.id = generate();
            this.ready = false;
            this.delay = false;
        }
    }
}

export default CombatantModel;