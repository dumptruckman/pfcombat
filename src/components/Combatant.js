import React from 'react';
import PropTypes from 'prop-types';

const Combatant = ({combatant}) => {
    return <li><span>{combatant.name}</span></li>;
};

Combatant.propTypes = {
    combatant: PropTypes.object.isRequired
};

export default Combatant;