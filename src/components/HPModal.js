import React, { Component } from 'react';
import ModalWrapper from "./ModalWrapper";
import Button from "./Button";
import CombatantModel from "../models/CombatantModel";

class HPModal extends Component {

    constructor(props) {
        super(props);
        this.getInputValue = this.getInputValue.bind(this);
    }

    damage(combatant, amount) {
        if (amount < 0) {
            this.heal(combatant, -amount);
        } else {
            let temp = Math.max(combatant.tempHp - amount, 0);
            let hp = combatant.currentHp - (amount - (combatant.tempHp - temp));
            let c = new CombatantModel(combatant);
            c.currentHp = hp;
            c.tempHp = temp;
            this.props.combatantsController.updateCombatant(c);
        }
    }

    heal(combatant, amount) {
        if (amount < 0) {
            this.damage(combatant, -amount);
        } else {
            let hp = Math.min(combatant.currentHp + amount, combatant.maxHp);
            let nonlethal = Math.max(combatant.nonlethalDamage - amount, 0);
            let c = new CombatantModel(combatant);
            c.currentHp = hp;
            c.nonlethalDamage = nonlethal;
            this.props.combatantsController.updateCombatant(c);
        }
    }

    dealNonlethal(combatant, amount) {
        if (amount < 0) {
            this.healNonlethal(combatant, amount);
        } else {
            this.props.combatantsController.setCombatantProp(combatant, "nonlethalDamage", combatant.nonlethalDamage + amount);
        }
    }

    healNonlethal(combatant, amount) {
        if (amount < 0) {
            this.healNonlethal(combatant, amount);
        } else {
            let nonlethal = Math.max(0, combatant.nonlethalDamage - amount);
            this.props.combatantsController.setCombatantProp(combatant, "nonlethalDamage", nonlethal);
        }
    }

    addTemporary(combatant, amount) {
        if (amount < 0) {
            this.removeTemporary(combatant, amount);
        } else {
            this.props.combatantsController.setCombatantProp(combatant, "tempHp", combatant.tempHp + amount);
        }
    }

    removeTemporary(combatant, amount) {
        if (amount < 0) {
            this.addTemporary(combatant, amount);
        } else {
            let temp = Math.max(0, combatant.tempHp - amount);
            this.props.combatantsController.setCombatantProp(combatant, "tempHp", temp);
        }
    }

    getInputValue() {
        let res = parseInt(this.input.value, 10);
        if (isNaN(res)) {
            res = 0;
        }
        return res;
    }

    render() {
        let combatant = this.props.combatantsController.getCombatantById(this.props.modalTarget);

        return (
            <ModalWrapper
                {...this.props}
                title={combatant.name}
                width={300}
                showOk={false}
            >
                <div style={{display: "flex", flexDirection: "column"}}>
                    <div style={{display: "flex", justifyContent: "space-between"}}>
                        <input size="4" ref={input => {this.input = input}}/>
                        <Button style={{fontSize: 12}} onClick={e => {
                            this.damage(combatant, this.getInputValue());
                            this.props.hideModal();
                        }}>Damage</Button>
                        <Button style={{fontSize: 12}} onClick={e => {
                            this.heal(combatant, this.getInputValue());
                            this.props.hideModal();
                        }}>Heal</Button>
                    </div>
                    <div style={{display: "flex", justifyContent: "space-around"}}>
                        <Button style={{fontSize: 12}} onClick={e => {
                            this.dealNonlethal(combatant, this.getInputValue());
                            this.props.hideModal();
                        }}>Deal Nonlethal</Button>
                        <Button style={{fontSize: 12}} onClick={e => {
                            this.healNonlethal(combatant, this.getInputValue());
                            this.props.hideModal();
                        }}>Heal Nonlethal</Button>
                    </div>
                    <div style={{display: "flex", justifyContent: "space-around"}}>
                        <Button style={{fontSize: 12}} onClick={e => {
                            this.addTemporary(combatant, this.getInputValue());
                            this.props.hideModal();
                        }}>Add Temp</Button>
                        <Button style={{fontSize: 12}} onClick={e => {
                            this.removeTemporary(combatant, this.getInputValue());
                            this.props.hideModal();
                        }}>Remove Temp</Button>
                    </div>
                </div>
            </ModalWrapper>
        );
    }

    componentDidMount() {
        this.input.focus();
    }
}

export default HPModal;