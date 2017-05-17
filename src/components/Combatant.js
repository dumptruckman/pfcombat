import React from 'react';
import PropTypes from 'prop-types';
import CombatantPropType from '../proptypes/CombatantPropType';

const Combatant = ({combatant}) => {
    return <li><span>{combatant.name}</span></li>;
};

Combatant.propTypes = {
    combatant: CombatantPropType
};

export default Combatant;