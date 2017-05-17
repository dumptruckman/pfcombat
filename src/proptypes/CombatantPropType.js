import React from 'react';
import PropTypes from 'prop-types';

const CombatantPropType = PropTypes.shape({
    name: PropTypes.string.isRequired
});

export default CombatantPropType;