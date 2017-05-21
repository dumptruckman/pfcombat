import React from 'react';
import PropTypes from 'prop-types';
import CombatantExtraInfo from "./CombatantExtraInfo";
import "../composite.css";
import {CombatantType, INITIATIVE} from "../CombatantType";
import CombatantModel from "../models/CombatantModel";
import ValueButton from "./ValueButton";
import ValueBox from "./ValueBox";
import Button from "./Button";

const Combatant = ({index, combatant, combatantType, selected, onClick, updateCombatant, initController}) => {
    let elementClass = "combatant-list__element";
    let topSection = (
        <div className="combatant__info combatant__info--vertical">
            <div className="combatant__info">
                <input title="creature name" className="input"
                       defaultValue={combatant.name} style={{flexGrow: 1}}
                       onClick={(e) => {e.stopPropagation()}}
                       onChange={(e) => {
                           let newCombatant = new CombatantModel(combatant);
                           newCombatant.name = e.target.value;
                           updateCombatant(index, newCombatant);
                           e.stopPropagation();
                       }} />
                <ValueBox text="Init Mod:" value={combatant.initMod}
                          size={3} title="init mod"
                          onChange={e => {
                              let newCombatant = new CombatantModel(combatant);
                              newCombatant.initMod = e.target.value;
                              updateCombatant(index, newCombatant);
                          }} />
                <Button title="Remove" className="button"
                        onClick={e => { // TODO Remove temporary combat toggle
                            let newCombatant = new CombatantModel(combatant);
                            newCombatant.inCombat = !combatant.inCombat;
                            updateCombatant(index, newCombatant);
                        }}>X</Button>
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
                    <ValueBox text="Init:" value={combatant.initiative}
                              size={2} title="initiative"
                              onChange={e => {
                                  let value = parseInt(e.target.value, 10);
                                  if (isNaN(value)) {
                                      value = 0;
                                  }
                                  let newCombatant = new CombatantModel(combatant);
                                  newCombatant.initiative = value;
                                  updateCombatant(index, newCombatant);
                              }} />
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
            {(combatantType === INITIATIVE && <div className="combatant__turn-arrow">{initController.getTurnIndex() === index ? "=>" : ""}</div>)}
            <div className="combatant" onClick={() => {onClick(index)}}>
                {topSection}
                <CombatantExtraInfo combatant={combatant} selected={selected} />
            </div>
        </li>
    );
};

Combatant.propTypes = {
    index: PropTypes.number.isRequired,
    combatant: PropTypes.instanceOf(CombatantModel).isRequired,
    combatantType: PropTypes.instanceOf(CombatantType).isRequired,
    selected: PropTypes.bool,
    onClick: PropTypes.func.isRequired,
    updateCombatant: PropTypes.func.isRequired,
    initController: PropTypes.shape({
        nextTurn: PropTypes.func.isRequired,
        prevTurn: PropTypes.func.isRequired,
        getTurnIndex: PropTypes.func.isRequired
    })
};

export default Combatant;