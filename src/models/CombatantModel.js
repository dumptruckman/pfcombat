import React from 'react';
import PropTypes from 'prop-types';

export const CombatantPropType = PropTypes.shape({
    name: PropTypes.string.isRequired,
    initMod: PropTypes.number.isRequired,
    initiative: PropTypes.number.isRequired,
    maxHp: PropTypes.number.isRequired,
    currentHp: PropTypes.number.isRequired,
    tempHp: PropTypes.number.isRequired,
    nonlethalDamage: PropTypes.number.isRequired
});

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