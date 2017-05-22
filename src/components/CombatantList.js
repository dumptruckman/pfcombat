import React from 'react';
import PropTypes from 'prop-types';
import {CombatantType, ENEMY, INITIATIVE, PARTY} from "../CombatantType";
import CombatantContainer from "../containers/CombatantContainer";
import CombatantsController from "../controllers/CombatantsController";
import InitiativeController from "../controllers/InitiativeController";

const CombatantList = ({combatantsController, combatantType, selected, onClick, initController}) => {
    return (
        <div className="combatant-list">
            <ul>
                {combatantsController.getAllCombatants().filter((combatant) => {
                    return (combatantType === INITIATIVE && combatant.inCombat)
                        || (combatantType === ENEMY && !combatant.isParty)
                        || (combatantType === PARTY && combatant.isParty);
                }).map((combatant, i) => {
                    return (
                        <CombatantContainer
                            key={combatant.id}
                            index={i}
                            combatant={combatant}
                            combatantType={combatantType}
                            selected={selected === i}
                            onClick={onClick}
                            combatantsController={combatantsController}
                            initController={initController}
                        />
                    );
                })}
            </ul>
        </div>
    );
};

CombatantList.propTypes = {
    combatantsController: PropTypes.instanceOf(CombatantsController).isRequired,
    combatantType: PropTypes.instanceOf(CombatantType).isRequired,
    selected: PropTypes.number.isRequired,
    onClick: PropTypes.func.isRequired,
    initController: PropTypes.instanceOf(InitiativeController)
};

export default CombatantList;