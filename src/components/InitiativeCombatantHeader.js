import React from "react";
import PropTypes from "prop-types";
import "../composite.css";
import CombatantModel from "../models/CombatantModel";
import CombatantsController from "../controllers/CombatantsController";
import HPButton from "./HPButton";
import CombatantValueBox from "./CombatantValueBox";
import FlexBox from "./layout/FlexBox";

const InitiativeCombatantHeader = ({ combatant, combatantsController }) => {
  let hpStyle;
  if (combatant.currentHp === 0) {
    hpStyle = { backgroundColor: "#c1c1c1" };
  } else if (combatant.currentHp < 0) {
    hpStyle = { backgroundColor: "#cf7672" };
  }

  return (
    <FlexBox>
      <span className="combatant__name" style={{ flexGrow: 1 }}>{combatant.name}</span>
      <FlexBox>
        <HPButton
          text="HP:"
          value={combatant.currentHp}
          controller={combatantsController}
          combatant={combatant}
          style={hpStyle}
          type="normal"
        />
        <CombatantValueBox
          text="Init:"
          size={2}
          title="initiative"
          combatant={combatant}
          controller={combatantsController}
          prop={"initiative"}
          type="number"
        />
        <div style={{ minWidth: 10 }} />
      </FlexBox>
    </FlexBox>
  );
};

InitiativeCombatantHeader.propTypes = {
  combatant: PropTypes.instanceOf(CombatantModel).isRequired,
  combatantsController: PropTypes.instanceOf(CombatantsController).isRequired,
};

export default InitiativeCombatantHeader;
