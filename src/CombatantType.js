export class CombatantType {
    constructor(type) {
        this.type = type;
    }
}

export const INITIATIVE = new CombatantType("initiative");
export const PARTY = new CombatantType("party");
export const ENEMY = new CombatantType("enemy");