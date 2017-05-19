class CombatantModel {
    constructor(name) {
        this.name = name;
        this.initMod = 0;
        this.initiative = 0;
        this.maxHp = 5;
        this.currentHp = 5;
        this.tempHp = 0;
        this.nonlethalDamage = 0;
    }
}

export default CombatantModel;