import React from 'react';
import PropTypes from 'prop-types';
import CombatantModel from "../models/CombatantModel";
import {CombatantType} from "../CombatantType";
import CombatantContainer from "../containers/CombatantContainer";

const CombatantList = ({combatants, combatantType, selected}) => {
    return (
        <div className="combatant-list">
            <ul>
                {combatants.map((combatant, i) => {
                    return <CombatantContainer key={combatant.name} combatant={combatant} combatantType={combatantType} selected={selected === i} />;
                })}
            </ul>
        </div>
    );
};

CombatantList.propTypes = {
    combatants: PropTypes.arrayOf(PropTypes.instanceOf(CombatantModel)).isRequired,
    combatantType: PropTypes.instanceOf(CombatantType).isRequired
};

export default CombatantList;