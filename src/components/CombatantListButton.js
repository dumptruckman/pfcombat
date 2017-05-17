import React from 'react';

const CombatantListButton = ({text}) => {
    return <li><span>{text}</span></li>;
};

CombatantListButton.propTypes = {
    text: PropTypes.string
};

export default CombatantListButton;