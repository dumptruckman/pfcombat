class CombatantModel {
    constructor(name, party) {
        this.name = name;
        this.isParty = party;
        this.initMod = 0;
        this.initiative = 0;
        this.maxHp = 5;
        this.currentHp = 5;
        this.tempHp = 0;
        this.nonlethalDamage = 0;
        this.inCombat = true;
    }
}

export default CombatantModel;