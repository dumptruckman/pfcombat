import React from "react";
import PropTypes from "prop-types";
import Radium from "radium";
import CombatantExtraInfo from "./CombatantExtraInfo";
import "../composite.css";
import { CombatantType, INITIATIVE } from "../CombatantType";
import CombatantModel from "../models/CombatantModel";
import CombatantsController from "../controllers/CombatantsController";
import InitiativeController from "../controllers/InitiativeController";
import CombatantStatusIndicator from "./CombatantStatusIndicator";
import CombatantWrapper from "./CombatantWrapper";

const styles = {
  base: {
    margin: 1,
    display: "flex",

    textDecoration: "none",
    textRendering: "optimizeLegibility",
    listStyle: "none",

    backgroundColor: "#fff",
    borderRadius: 3,
    paddingLeft: 4,
    paddingRight: 4,

    ":hover": {
      backgroundColor: "#4598CD",
    },
  },
  init: {
    WebkitUserDrag: "element",
  },
  initSelected: {
    backgroundColor: "#ADD7F0",
  },
  editor: {
    backgroundColor: "#F5ECB6",
  },
  editorSelected: {
    backgroundColor: "#E4CC37",
  },
};

const Combatant = props => (
  <li
    style={[
      styles.base,
      props.combatantType === INITIATIVE && styles.init,
      (props.combatantType === INITIATIVE && props.selected) && styles.initSelected,
      props.combatantType !== INITIATIVE && styles.editor,
      (props.combatantType !== INITIATIVE && props.selected) && styles.editorSelected,
    ]}
  >
    {(props.combatantType === INITIATIVE && <CombatantStatusIndicator
      delay={props.combatant.delay}
      ready={props.combatant.ready}
      turn={props.initController.getTurnIndex() === props.index}
    />)}
    <CombatantWrapper index={props.index} onClick={props.onClick}>
      {props.header}
      <CombatantExtraInfo
        combatant={props.combatant}
        selected={props.selected}
        combatantsController={props.combatantsController}
      />
    </CombatantWrapper>
  </li>
);

Combatant.propTypes = {
  index: PropTypes.number.isRequired,
  combatant: PropTypes.instanceOf(CombatantModel).isRequired,
  combatantType: PropTypes.instanceOf(CombatantType).isRequired,
  selected: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  combatantsController: PropTypes.instanceOf(CombatantsController).isRequired,
  initController: PropTypes.instanceOf(InitiativeController),
  header: PropTypes.element.isRequired,
};

Combatant.defaultProps = {
  selected: false,
  initController: undefined,
};

export default Radium(Combatant);
