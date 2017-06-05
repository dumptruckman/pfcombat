import React, { Component } from "react";
import PropTypes from "prop-types";
import Radium from "radium";
import ModalWrapper from "./ModalWrapper";
import Button from "./Button";
import CombatantModel from "../models/CombatantModel";
import CombatantsController from "../controllers/CombatantsController";
import FlexBox from "./layout/FlexBox";
import ButtonPanel from "./layout/ButtonPanel";

const styles = {
  button: {
    base: {
      fontSize: 12,
    },
    target: {
      fontSize: 14,
      fontWeight: "bold",
    },
  },
};

class HPModal extends Component {

  constructor(props) {
    super(props);
    this.getInputValue = this.getInputValue.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
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
      const hp = Math.min(combatant.currentHp + amount, combatant.getMaxHp());
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

  handleKeyPress(event, combatant) {
    const keyCode = event.which || event.keyCode;
    if (keyCode === 13) {
      switch (this.props.modalData) {
        case "normal":
        default:
          if (event.shiftKey) {
            this.heal(combatant, this.getInputValue());
          } else {
            this.damage(combatant, this.getInputValue());
          }
          break;
        case "nonlethal":
          if (event.shiftKey) {
            this.healNonlethal(combatant, this.getInputValue());
          } else {
            this.dealNonlethal(combatant, this.getInputValue());
          }
          break;
        case "temp":
          if (event.shiftKey) {
            this.removeTemporary(combatant, this.getInputValue());
          } else {
            this.addTemporary(combatant, this.getInputValue());
          }
          break;
      }
      this.props.hideModal();
    }
  }

  render() {
    const combatant = this.props.combatantsController.getCombatantById(this.props.modalTarget);

    return (
      <ModalWrapper
        {...this.props}
        title={combatant.name}
        width={200}
        showOk={false}
      >
        <FlexBox vertical>
          <ButtonPanel>
            <input
              type="number"
              size="4"
              ref={(input) => { this.input = input; }}
              style={{ maxWidth: 37 }}
              onKeyPress={e => this.handleKeyPress(e, combatant)}
            />
            <Button
              style={[
                styles.button.base,
                this.props.modalData === "normal" && styles.button.target,
              ]}
              grow
              onClick={() => {
                this.damage(combatant, this.getInputValue());
                this.props.hideModal();
              }}
            >Damage</Button>
            <Button
              style={[
                styles.button.base,
                this.props.modalData === "normal" && styles.button.target,
              ]}
              grow
              onClick={() => {
                this.heal(combatant, this.getInputValue());
                this.props.hideModal();
              }}
            >Heal</Button>
          </ButtonPanel>
          <ButtonPanel>
            <Button
              style={[
                styles.button.base,
                this.props.modalData === "nonlethal" && styles.button.target,
              ]}
              grow
              onClick={() => {
                this.dealNonlethal(combatant, this.getInputValue());
                this.props.hideModal();
              }}
            >Deal Nonlethal</Button>
            <Button
              style={[
                styles.button.base,
                this.props.modalData === "nonlethal" && styles.button.target,
              ]}
              grow
              onClick={() => {
                this.healNonlethal(combatant, this.getInputValue());
                this.props.hideModal();
              }}
            >Heal Nonlethal</Button>
          </ButtonPanel>
          <ButtonPanel>
            <Button
              style={[
                styles.button.base,
                this.props.modalData === "temp" && styles.button.target,
              ]}
              grow
              onClick={() => {
                this.addTemporary(combatant, this.getInputValue());
                this.props.hideModal();
              }}
            >Add Temp</Button>
            <Button
              style={[
                styles.button.base,
                this.props.modalData === "temp" && styles.button.target,
              ]}
              grow
              onClick={() => {
                this.removeTemporary(combatant, this.getInputValue());
                this.props.hideModal();
              }}
            >Remove Temp</Button>
          </ButtonPanel>
        </FlexBox>
      </ModalWrapper>
    );
  }
}

HPModal.propTypes = {
  combatantsController: PropTypes.instanceOf(CombatantsController).isRequired,
  modalTarget: PropTypes.string.isRequired,
  hideModal: PropTypes.func.isRequired,
  modalData: PropTypes.string.isRequired,
};

export default Radium(HPModal);
