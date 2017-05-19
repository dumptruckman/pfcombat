import React from 'react';
import PropTypes from 'prop-types';
import "../composite.css";
import CombatantModel from "../models/CombatantModel";

const CombatantExtraInfo = ({combatant}) => {
    return (
        //<!--<div className="combatant__info combantant__info&#45;&#45;extras combatant__info&#45;&#45;vertical combatant__info&#45;&#45;hidden">-->
        <div className="combatant__info combatant__info--extras combatant__info--vertical">
            <div className="combatant__info combatant__info--space-around">
                <div className="combatant__info">
                    <span className="combatant__combat-stats-label">Temp HP:</span>
                    <button className="button button--hp">0</button>
                </div>
                <div className="combatant__info">
                    <span className="combatant__combat-stats-label">Nonlethal Damage:</span>
                    <button className="button button--hp">0</button>
                </div>
            </div>
            <div className="combatant_info combatant__info--vertical">
                <span>Conditions</span>
                <div className="combatant__info combatant__info--space-around">
                    <span className="combatant__condition-label">Blinded</span>
                    <span className="combatant__condition-label">Confused</span>
                    <span className="combatant__condition-label">Grappled</span>
                    <span className="combatant__condition-label">Dazed</span>
                </div>
            </div>
            <button className="button">Edit Combatant</button>
        </div>
    );
};

CombatantExtraInfo.propTypes = {
    combatant: PropTypes.instanceOf(CombatantModel).isRequired
};

export default CombatantExtraInfo