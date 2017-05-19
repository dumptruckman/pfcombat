import React from 'react';
import PropTypes from 'prop-types';
import CombatantModel from "../models/CombatantModel";
import {CombatantType, ENEMY, INITIATIVE, PARTY} from "../CombatantType";
import CombatantContainer from "../containers/CombatantContainer";

const CombatantList = ({combatants, combatantType, selected, onClick, updateCombatant}) => {
    return (
        <div className="combatant-list">
            <ul>
                {combatants.filter((combatant) => {
                    return (combatantType === INITIATIVE && combatant.inCombat)
                        || (combatantType === ENEMY && !combatant.isParty)
                        || (combatantType === PARTY && combatant.isParty);
                }).map((combatant, i) => {
                    return (
                        <CombatantContainer
                            key={i.toString()}
                            index={i}
                            combatant={combatant}
                            combatantType={combatantType}
                            selected={selected === i}
                            onClick={onClick}
                            updateCombatant={updateCombatant} />
                    );
                })}
            </ul>
        </div>
    );
};

CombatantList.propTypes = {
    combatants: PropTypes.arrayOf(PropTypes.instanceOf(CombatantModel)).isRequired,
    combatantType: PropTypes.instanceOf(CombatantType).isRequired,
    selected: PropTypes.number.isRequired,
    onClick: PropTypes.func.isRequired,
    updateCombatant: PropTypes.func.isRequired
};

export default CombatantList;