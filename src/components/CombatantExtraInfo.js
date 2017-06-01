import React from "react";
import PropTypes from "prop-types";
import "../composite.css";
import CombatantModel from "../models/CombatantModel";
import Button from "./Button";
import CombatantsController from "../controllers/CombatantsController";
import HPButton from "./HPButton";
import FlexBox from "./layout/FlexBox";

const CombatantExtraInfo = ({ combatant, selected, combatantsController }) => (
  <FlexBox vertical style={{ backgroundColor: "#76A530", borderRadius: 3 }} hidden={!selected}>
    <FlexBox spaceAround>
      <HPButton
        text="Temp HP:"
        value={combatant.tempHp}
        controller={combatantsController}
        combatant={combatant}
      />
      <HPButton
        text="Nonlethal Damage:"
        value={combatant.nonlethalDamage}
        controller={combatantsController}
        combatant={combatant}
      />
    </FlexBox>
    <FlexBox>
      <Button
        onClick={() => {
          const c = new CombatantModel(combatant);
          c.delay = false;
          c.ready = false;
          c.inCombat = !c.inCombat;
          combatantsController.updateCombatant(c);
        }}
      >{combatant.inCombat ? "Make Idle" : "Make Active"}</Button>
      <Button
        grow
        disabled={!combatant.inCombat}
        onClick={() => {
          if (combatant.inCombat) {
            const c = new CombatantModel(combatant);
            c.delay = false;
            c.ready = !c.ready;
            combatantsController.updateCombatant(c);
          }
        }}
      >{combatant.ready ? "Act Now" : "Ready"}</Button>
      <Button
        disabled={!combatant.inCombat}
        onClick={() => {
          if (combatant.inCombat) {
            const c = new CombatantModel(combatant);
            c.delay = !c.delay;
            c.ready = false;
            combatantsController.updateCombatant(c);
          }
        }}
      >{combatant.delay ? "Act Now" : "Delay"}</Button>

    </FlexBox>
    <FlexBox vertical hidden>
      <span>Conditions</span>
      <FlexBox spaceAround>
        <span className="combatant__condition-label">Blinded</span>
        <span className="combatant__condition-label">Confused</span>
        <span className="combatant__condition-label">Grappled</span>
        <span className="combatant__condition-label">Dazed</span>
      </FlexBox>
    </FlexBox>

    <Button style={{ display: "none" }} disabled>Edit Combatant</Button>
  </FlexBox>
);

CombatantExtraInfo.propTypes = {
  combatant: PropTypes.instanceOf(CombatantModel).isRequired,
  selected: PropTypes.bool,
  combatantsController: PropTypes.instanceOf(CombatantsController).isRequired,
};

CombatantExtraInfo.defaultProps = {
  selected: false,
};

export default CombatantExtraInfo;
