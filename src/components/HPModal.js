import React, { Component } from "react";
import PropTypes from "prop-types";
import ModalWrapper from "./ModalWrapper";
import Button from "./Button";
import CombatantModel from "../models/CombatantModel";
import CombatantsController from "../controllers/CombatantsController";

class HPModal extends Component {

  constructor(props) {
    super(props);
    this.getInputValue = this.getInputValue.bind(this);
  }

  componentDidMount() {
    this.input.focus();
  }

  getInputValue() {
    let res = parseInt(this.input.value, 10);
    if (isNaN(res)) {
      res = 0;
    }
    return res;
  }

  damage(combatant, amount) {
    if (amount < 0) {
      this.heal(combatant, -amount);
    } else {
      const temp = Math.max(combatant.tempHp - amount, 0);
      const hp = combatant.currentHp - (amount - (combatant.tempHp - temp));
      const c = new CombatantModel(combatant);
      c.currentHp = hp;
      c.tempHp = temp;
      this.props.combatantsController.updateCombatant(c);
    }
  }

  heal(combatant, amount) {
    if (amount < 0) {
      this.damage(combatant, -amount);
    } else {
      const hp = Math.min(combatant.currentHp + amount, combatant.maxHp);
      const nonlethal = Math.max(combatant.nonlethalDamage - amount, 0);
      const c = new CombatantModel(combatant);
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
      const nonlethal = Math.max(0, combatant.nonlethalDamage - amount);
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
      const temp = Math.max(0, combatant.tempHp - amount);
      this.props.combatantsController.setCombatantProp(combatant, "tempHp", temp);
    }
  }

  render() {
    const combatant = this.props.combatantsController.getCombatantById(this.props.modalTarget);

    return (
      <ModalWrapper
        {...this.props}
        title={combatant.name}
        width={300}
        showOk={false}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <input size="4" ref={(input) => { this.input = input; }} />
            <Button
              style={{ fontSize: 12 }}
              onClick={() => {
                this.damage(combatant, this.getInputValue());
                this.props.hideModal();
              }}
            >Damage</Button>
            <Button
              style={{ fontSize: 12 }}
              onClick={() => {
                this.heal(combatant, this.getInputValue());
                this.props.hideModal();
              }}
            >Heal</Button>
          </div>
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <Button
              style={{ fontSize: 12 }}
              onClick={() => {
                this.dealNonlethal(combatant, this.getInputValue());
                this.props.hideModal();
              }}
            >Deal Nonlethal</Button>
            <Button
              style={{ fontSize: 12 }}
              onClick={() => {
                this.healNonlethal(combatant, this.getInputValue());
                this.props.hideModal();
              }}
            >Heal Nonlethal</Button>
          </div>
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <Button
              style={{ fontSize: 12 }}
              onClick={() => {
                this.addTemporary(combatant, this.getInputValue());
                this.props.hideModal();
              }}
            >Add Temp</Button>
            <Button
              style={{ fontSize: 12 }}
              onClick={() => {
                this.removeTemporary(combatant, this.getInputValue());
                this.props.hideModal();
              }}
            >Remove Temp</Button>
          </div>
        </div>
      </ModalWrapper>
    );
  }
}

HPModal.propTypes = {
  combatantsController: PropTypes.instanceOf(CombatantsController).isRequired,
  modalTarget: PropTypes.string.isRequired,
  hideModal: PropTypes.func.isRequired,
};

export default HPModal;
