import React from 'react';
import PropTypes from 'prop-types';
import CombatantListButtonContainer from "../containers/CombatantListButtonContainer";

const CombatantList = ({combatants}) => {
    return (<ul>
        {combatants}
        <CombatantListButtonContainer text="Add Combatant" />
    </ul>);
};

CombatantList.propTypes = {
    combatants: PropTypes.array.isRequired
};

export default CombatantList;