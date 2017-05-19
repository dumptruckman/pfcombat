import React from 'react';
import PropTypes from 'prop-types';
import CombatantExtraInfo from "./CombatantExtraInfo";
import "../composite.css";
import {CombatantType, INITIATIVE} from "../CombatantType";
import CombatantModel from "../models/CombatantModel";
import ValueButton from "./ValueButton";
import ValueBox from "./ValueBox";

const Combatant = ({combatant, combatantType, selected}) => {
    let elementClass = "combatant-list__element";
    let topSection = (
        <div className="combatant__info combatant__info--vertical">
            <div className="combatant__info">
                <input title="creature name" className="input" defaultValue={combatant.name} style={{flexGrow: 1}} />
                <ValueBox text="Init Mod:" value={combatant.initMod} size={3} title="init mod" />
                <button title="Remove" className="button">X</button>
            </div>
            <div className="combatant__info">
                <ValueButton text="HP:" value={combatant.currentHp} />
                <ValueBox text="Max HP:" value={combatant.maxHp} size={4} title="maximum hp" />
            </div>
        </div>
    );
    if (combatantType === INITIATIVE) { // Initiative pane shows different info in the top section of the combatant display
        topSection = (
            <div className="combatant__info">
                <span className="combatant__name" style={{flexGrow: 1}}>{combatant.name}</span>
                <div className="combatant__info">
                    <ValueButton text="HP:" value={combatant.currentHp} />
                    <ValueBox text="Init:" value={combatant.initiative} size={2} title="initiative" />
                </div>
            </div>
        );
        if (selected) {
            elementClass += " combatant-list__element--selected-init"
        }
    } else {
        elementClass += " combatant-list__element--editor";
        if (selected) {
            elementClass += " combatant-list__element--selected-editor";
        }
    }

    return (
        <li className={elementClass}>
            {(combatantType === INITIATIVE && <div className="combatant__turn-arrow">{selected ? "=>" : ""}</div>)}
            <div className="combatant">
                {topSection}
                <CombatantExtraInfo combatant={combatant} selected={selected} />
            </div>
        </li>
    );
};

Combatant.propTypes = {
    combatant: PropTypes.instanceOf(CombatantModel).isRequired,
    combatantType: PropTypes.instanceOf(CombatantType).isRequired,
    selected: PropTypes.bool
};

export default Combatant;