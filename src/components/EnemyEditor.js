import React from 'react';
import PropTypes from 'prop-types';
import "../composite.css";
import CombatantListContainer from "../containers/CombatantListContainer";
import {ENEMY} from "../CombatantType";
import CombatantModel from "../models/CombatantModel";

const EnemyEditor = ({enemies}) => {
    return (
        <div id="enemy-editor" className="combat-pane">
            <p className="combat-pane__title">Enemy Editor</p>
            <div className="button-panel">
                <button className="button" style={{flexGrow: 2}}>New Monster</button>
                <button className="button" style={{flexGrow: 1}}>Save</button>
                <button className="button" style={{flexGrow: 1}}>Load</button>
            </div>
            <CombatantListContainer combatants={enemies} combatantType={ENEMY} />
            <div className="button-panel" style={{display: "flex"}}>
                <button className="button">Clear</button>
            </div>
        </div>
    );
};

EnemyEditor.propTypes = {
    enemies: PropTypes.arrayOf(PropTypes.instanceOf(CombatantModel)).isRequired
};

export default EnemyEditor;