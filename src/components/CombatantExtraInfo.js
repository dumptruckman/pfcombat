import React from 'react';
import PropTypes from 'prop-types';
import "../composite.css";
import CombatantModel from "../models/CombatantModel";
import ValueButton from "./ValueButton";

const CombatantExtraInfo = ({combatant, selected}) => {
    return (
        //<!--<div className="combatant__info combantant__info&#45;&#45;extras combatant__info&#45;&#45;vertical combatant__info&#45;&#45;hidden">-->
        <div className="combatant__info combatant__info--extras combatant__info--vertical" style={!selected ? {display: "none"} : {}}>
            <div className="combatant__info combatant__info--space-around">
                <ValueButton text="Temp HP:" value={combatant.tempHp}/>
                <ValueButton text="Nonlethal Damage:" value={combatant.nonlethalDamage} />
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
    combatant: PropTypes.instanceOf(CombatantModel).isRequired,
    selected: PropTypes.bool
};

export default CombatantExtraInfo