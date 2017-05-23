import React from 'react';
import PropTypes from 'prop-types';
import "../composite.css";
import CombatantModel from "../models/CombatantModel";
import ValueButton from "./ValueButton";
import Button from "./Button";
import CombatantsController from "../controllers/CombatantsController";

const CombatantExtraInfo = ({combatant, selected, combatantsController}) => {
    return (
        //<!--<div className="combatant__info combantant__info&#45;&#45;extras combatant__info&#45;&#45;vertical combatant__info&#45;&#45;hidden">-->
        <div className="combatant__info combatant__info--extras combatant__info--vertical" style={!selected ? {display: "none"} : {}}>
            <div className="combatant__info combatant__info--space-around">
                <ValueButton text="Temp HP:" value={combatant.tempHp}
                             onClick={() => {
                                 combatantsController.showCurrentHpDialog(combatant);
                             }} />
                <ValueButton text="Nonlethal Damage:" value={combatant.nonlethalDamage}
                             onClick={() => {
                                 combatantsController.showCurrentHpDialog(combatant);
                             }} />
            </div>
            <div className="combatant__info">
                <Button onClick={() => {
                    let c = new CombatantModel(combatant);
                    c.delay = false;
                    c.ready = false;
                    c.inCombat = !c.inCombat;
                    combatantsController.updateCombatant(c);
                }}>{combatant.inCombat ? "Make Idle" : "Make Active"}</Button>
                <Button className={!combatant.inCombat && "button-disabled"} onClick={() => {
                    let c = new CombatantModel(combatant);
                    c.delay = false;
                    c.ready = !c.ready;
                    combatantsController.updateCombatant(c);
                }}>{combatant.ready ? "Act Now" : "Ready"}</Button>
                <Button className={!combatant.inCombat && "button-disabled"} onClick={() => {
                    let c = new CombatantModel(combatant);
                    c.delay = !c.delay;
                    c.ready = false;
                    combatantsController.updateCombatant(c);
                }}>{combatant.delay ? "Act Now" : "Delay"}</Button>

            </div>
            <div className="combatant__info combatant__info--vertical" style={{display: "none"}}>
                <span>Conditions</span>
                <div className="combatant__info combatant__info--space-around">
                    <span className="combatant__condition-label">Blinded</span>
                    <span className="combatant__condition-label">Confused</span>
                    <span className="combatant__condition-label">Grappled</span>
                    <span className="combatant__condition-label">Dazed</span>
                </div>
            </div>

            <Button className="button-disabled">Edit Combatant</Button>
        </div>
    );
};

CombatantExtraInfo.propTypes = {
    combatant: PropTypes.instanceOf(CombatantModel).isRequired,
    selected: PropTypes.bool,
    combatantsController: PropTypes.instanceOf(CombatantsController).isRequired
};

export default CombatantExtraInfo