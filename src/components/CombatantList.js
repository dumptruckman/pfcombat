import React from 'react';
import PropTypes from 'prop-types';

const CombatantList = ({combatants}) => {
    return <ul>{combatants}</ul>;
};

CombatantList.propTypes = {
    combatants: PropTypes.array.isRequired
};

export default CombatantList;