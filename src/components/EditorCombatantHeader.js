import React from "react";
import PropTypes from "prop-types";
import "../composite.css";
import CombatantModel from "../models/CombatantModel";
import CombatantsController from "../controllers/CombatantsController";
import HPButton from "./HPButton";
import CombatantValueBox from "./CombatantValueBox";
import Button from "./Button";
import FlexBox from "./layout/FlexBox";

const EditorCombatantHeader = ({ combatant, combatantsController }) => (
  <FlexBox vertical>
    <FlexBox>
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
        type="number"
        combatant={combatant}
        controller={combatantsController}
        prop={"initMod"}
      />
      <div style={{ minWidth: 20 }} />
      <Button
        title="Remove"
        onClick={() => {
          combatantsController.removeCombatant(combatant.id);
        }}
      >X</Button>
    </FlexBox>
    <FlexBox>
      <HPButton
        text="HP:"
        value={combatant.currentHp}
        controller={combatantsController}
        combatant={combatant}
        type="normal"
      />
      <CombatantValueBox
        text="Max HP:"
        size={4}
        title="maxmium hp"
        scroll
        type="number"
        combatant={combatant}
        controller={combatantsController}
        prop={"maxHp"}
      />
    </FlexBox>
  </FlexBox>
  );

EditorCombatantHeader.propTypes = {
  combatant: PropTypes.instanceOf(CombatantModel).isRequired,
  combatantsController: PropTypes.instanceOf(CombatantsController).isRequired,
};

export default EditorCombatantHeader;
