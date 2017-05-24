import React from "react";
import PropTypes from "prop-types";
import CombatantExtraInfo from "./CombatantExtraInfo";
import "../composite.css";
import { CombatantType, INITIATIVE } from "../CombatantType";
import CombatantModel from "../models/CombatantModel";
import Button from "./Button";
import CombatantsController from "../controllers/CombatantsController";
import InitiativeController from "../controllers/InitiativeController";
import HPButton from "./HPButton";
import CombatantValueBox from "./CombatantValueBox";

const Combatant = ({ index, combatant, combatantType, selected, onClick, combatantsController,
                     initController }) => {
  let elementClass = "combatant-list__element";
  let topSection = (
    <div className="combatant__info combatant__info--vertical">
      <div className="combatant__info">
        <CombatantValueBox
          title="creature name"
          placeholder="Enter name"
          style={{ flexGrow: 1 }}
          combatant={combatant}
          controller={combatantsController}
          prop={"name"}
        />
        <CombatantValueBox
          text="Init Mod:"
          size={3}
          title="init mod"
          scroll
          combatant={combatant}
          controller={combatantsController}
          prop={"initMod"}
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
        <HPButton
          text="HP:"
          value={combatant.currentHp}
          controller={combatantsController}
          combatant={combatant}
        />
        <CombatantValueBox
          text="Max HP:"
          size={4}
          title="maxmium hp"
          combatant={combatant}
          controller={combatantsController}
          prop={"maxHp"}
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
          <HPButton
            text="HP:"
            value={combatant.currentHp}
            controller={combatantsController}
            combatant={combatant}
            style={hpStyle}
          />
          <CombatantValueBox
            text="Init:"
            size={2}
            title="initiative"
            combatant={combatant}
            controller={combatantsController}
            prop={"initiative"}
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
      {(combatantType === INITIATIVE && <div className="combatant__turn-arrow">
        {initController.getTurnIndex() === index ? <i className="fa fa-play" /> : ""}
        {combatant.delay ? <i className="fa fa-clock-o" /> : ""}
        {combatant.ready ? <i className="fa fa-hourglass-half" /> : ""}
      </div>)}
      { // eslint-disable-next-line jsx-a11y/no-static-element-interactions
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
      }
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
