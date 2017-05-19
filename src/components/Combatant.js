import React from 'react';
import PropTypes from 'prop-types';
import CombatantExtraInfo from "./CombatantExtraInfo";
import "../composite.css";
import {CombatantType, ENEMY, INITIATIVE, PARTY} from "../CombatantType";
import CombatantModel from "../models/CombatantModel";

const Combatant = ({combatant, combatantType}) => {
    let elementClass = "combatant-list__element";
    let topSection = (
        <div className="combatant__info combatant__info--vertical">
            <div className="combatant__info">
                <input title="creature name" className="input" defaultValue="Johnny" style={{flexGrow: 1}} />
                <div className="combatant__info" style={{flexBasis: "content"}}>
                    <span className="combatant__combat-stats-label">Init:</span>
                    <input title="initiative" className="input input--initiative" defaultValue="13" size="2"/>
                </div>
                <button className="button">X</button>
            </div>
            <div className="combatant__info">
                <div className="combatant__info">
                    <span className="combatant__combat-stats-label">HP:</span>
                    <button className="button button--hp">20</button>
                </div>
                <div className="combatant__info">
                    <span className="combatant__combat-stats-label">Max HP:</span>
                    <input title="max hp" className="input input--max-hp" defaultValue="40" size="4"/>
                </div>
            </div>
        </div>
    );
    switch (combatantType) {
        case INITIATIVE:
            topSection = (
                <div className="combatant__info combatant__info--space-between">
                    <span className="combatant__name">Johnny</span>
                    <div className="combatant__info">
                        <div className="combatant__info combatant__info--hp">
                            <span className="combatant__combat-stats-label">HP:</span>
                            <button className="button button--hp">20</button>
                        </div>
                        <div className="combatant__info">
                            <span className="combatant__combat-stats-label">Init:</span>
                            <input title="initiative" className="input input--initiative" defaultValue="13" size="2"/>
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