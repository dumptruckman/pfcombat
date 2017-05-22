import React from 'react';
import PropTypes from 'prop-types';
import "../composite.css";
import CombatantListContainer from "../containers/CombatantListContainer";
import {ENEMY} from "../CombatantType";
import Button from "./Button";
import CombatantsController from "../controllers/CombatantsController";

const EnemyEditor = ({combatantsController}) => {
    return (
        <div id="enemy-editor" className="combat-pane">
            <p className="combat-pane__title">Enemy Editor</p>
            <div className="button-panel">
                <Button className="button" style={{flexGrow: 2}}
                        onClick={() => combatantsController.addCombatant(false)}>New Monster</Button>
                <Button className="button-disabled" style={{flexGrow: 1}}>Save</Button>
                <Button className="button-disabled" style={{flexGrow: 1}}>Load</Button>
            </div>
            <CombatantListContainer
                combatantsController={combatantsController}
                combatantType={ENEMY}/>
            <div className="button-panel" style={{display: "flex"}}>
                <Button className="button"
                        onClick={() => combatantsController.removeCombatants(false)}>Clear</Button>
            </div>
        </div>
    );
};

EnemyEditor.propTypes = {
    combatantsController: PropTypes.instanceOf(CombatantsController).isRequired,
};

export default EnemyEditor;