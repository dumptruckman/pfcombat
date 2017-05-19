import React from 'react';
import PropTypes from 'prop-types';
import CombatantModel from "../models/CombatantModel";
import {CombatantType} from "../CombatantType";
import Combatant from "./Combatant";

const CombatantList = ({combatants, combatantType}) => {
    return (
        <div className="combatant-list">
            <ul>
                {combatants.map((combatant) => {
                    return <Combatant key={combatant.name} combatant={combatant} combatantType={combatantType} />;
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