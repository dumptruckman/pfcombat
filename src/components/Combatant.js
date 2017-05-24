import React from "react";
import PropTypes from "prop-types";
import CombatantExtraInfo from "./CombatantExtraInfo";
import "../composite.css";
import { CombatantType, INITIATIVE } from "../CombatantType";
import CombatantModel from "../models/CombatantModel";
import ValueButton from "./ValueButton";
import ValueBox from "./ValueBox";
import Button from "./Button";
import CombatantsController from "../controllers/CombatantsController";
import InitiativeController from "../controllers/InitiativeController";

const Combatant = ({ index, combatant, combatantType, selected, onClick, combatantsController,
                     initController }) => {
  let elementClass = "combatant-list__element";
  let topSection = (
    <div className="combatant__info combatant__info--vertical">
      <div className="combatant__info">
        <input
          title="creature name"
          className="input"
          defaultValue={combatant.name}
          style={{ flexGrow: 1 }}
          onClick={(e) => { e.stopPropagation(); }}
          onChange={(e) => {
            combatantsController.setCombatantProp(combatant, "name", e.target.value);
            e.stopPropagation();
          }}
        />
        <ValueBox
          text="Init Mod:"
          value={combatant.initMod}
          size={3}
          title="init mod"
          scroll
          onChange={(value) => {
            combatantsController.setCombatantProp(combatant, "initMod", value);
          }}
        />
        <Button
          title="Remove"
          className="button"
          onClick={() => {
            combatantsController.removeCombatant(combatant.id);
          }}
        >X</Button>
      </div>
      <div className="combatant__info">
        <ValueButton
          text="HP:"
          value={combatant.currentHp}
          onClick={() => {
            combatantsController.showCurrentHpDialog(combatant);
          }}
        />
        <ValueBox
          text="Max HP:"
          value={combatant.maxHp}
          size={4}
          title="maximum hp"
          onChange={(value) => {
            combatantsController.setCombatantProp(combatant, "maxHp", value);
          }}
        />
      </div>
    </div>
  );
  // Initiative pane shows different info in the top section of the combatant display
  if (combatantType === INITIATIVE) {
    let hpStyle;
    if (combatant.currentHp === 0) {
      hpStyle = { backgroundColor: "#c1c1c1" };
    } else if (combatant.currentHp < 0) {
      hpStyle = { backgroundColor: "#cf7672" };
    }
    topSection = (
      <div className="combatant__info">
        <span className="combatant__name" style={{ flexGrow: 1 }}>{combatant.name}</span>
        <div className="combatant__info">
          <ValueButton
            text="HP:"
            value={combatant.currentHp}
            style={hpStyle}
            onClick={() => {
              combatantsController.showCurrentHpDialog(combatant);
            }}
          />
          <ValueBox
            text="Init:"
            value={combatant.initiative}
            size={2}
            title="initiative"
            onChange={(val) => {
              let value = parseInt(val, 10);
              if (isNaN(value)) {
                value = 0;
              }
              const newCombatant = new CombatantModel(combatant);
              newCombatant.initiative = value;
              combatantsController.updateCombatant(newCombatant);
            }}
          />
        </div>
      </div>
        );
    elementClass += " combatant-list__element--init";
    if (selected) {
      elementClass += " combatant-list__element--selected-init";
    }
  } else {
    elementClass += " combatant-list__element--editor";
    if (selected) {
      elementClass += " combatant-list__element--selected-editor";
    }
  }

  return (
    <li className={elementClass}>
      {(combatantType === INITIATIVE && <div className="combatant__turn-arrow">{
        initController.getTurnIndex() === index ? <i className="fa fa-play" /> : ""
      }</div>)}
      <div
        role="presentation"
        className="combatant"
        onClick={() => {
          onClick(index);
        }}
        onContextMenu={e => e.preventDefault()}
      >
        {topSection}
        <CombatantExtraInfo
          combatant={combatant}
          selected={selected}
          combatantsController={combatantsController}
        />
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
  combatantsController: PropTypes.instanceOf(CombatantsController).isRequired,
  initController: PropTypes.instanceOf(InitiativeController),
};

Combatant.defaultProps = {
  selected: false,
  initController: undefined,
};

export default Combatant;
