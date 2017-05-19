import React from 'react';
import PropTypes from 'prop-types';
import CombatantExtraInfo from "./CombatantExtraInfo";
import "../composite.css";
import {CombatantType, ENEMY, INITIATIVE, PARTY} from "../CombatantType";
import CombatantModel from "../models/CombatantModel";
import ValueButtonComponent from "./ValueButtonComponent";
import ValueBoxComponent from "./ValueBoxComponent";

const Combatant = ({combatant, combatantType}) => {
    let elementClass = "combatant-list__element";
    let topSection = (
        <div className="combatant__info combatant__info--vertical">
            <div className="combatant__info">
                <input title="creature name" className="input" defaultValue="Johnny" style={{flexGrow: 1}} />
                <ValueBoxComponent text="Init Mod:" value={0} size={3} title="init mod" />
                <button className="button">X</button>
            </div>
            <div className="combatant__info">
                <ValueButtonComponent text="HP:" value={20} />
                <ValueBoxComponent text="Max HP:" value={20} size={4} title="maximum hp" />
            </div>
        </div>
    );
    switch (combatantType) {
        case INITIATIVE:
            topSection = (
                <div className="combatant__info">
                    <span className="combatant__name" style={{flexGrow: 1}}>Johnny</span>
                    <div className="combatant__info">
                        <div className="combatant__info combatant__info--hp">
                            <span className="combatant__combat-stats-label">HP:</span>
                            <button className="button button--hp">20</button>
                        </div>
                        <div className="combatant__info">
                            <ValueBoxComponent text="Init:" value={0} size={2} title="initiative" />
                        </div>
                    </div>
                </div>
            );
            break;
        case PARTY:
            elementClass += " combatant-list__element--party";
            break;
        case ENEMY:
            elementClass += " combatant-list__element--enemy";
            break;
        default:
    }

    return (
        <li className={elementClass}>
            {(combatantType === INITIATIVE && <div className="combatant__turn-arrow">=></div>)}
            <div className="combatant">
                {topSection}
                <CombatantExtraInfo combatant={combatant} />
            </div>
        </li>
    );
};

Combatant.propTypes = {
    combatant: PropTypes.instanceOf(CombatantModel).isRequired,
    combatantType: PropTypes.instanceOf(CombatantType).isRequired
};

export default Combatant;