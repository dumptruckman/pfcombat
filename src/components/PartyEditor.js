import React from 'react';
import PropTypes from 'prop-types';
import "../composite.css";
import CombatantListContainer from "../containers/CombatantListContainer";
import {PARTY} from "../CombatantType";
import CombatantModel from "../models/CombatantModel";

const PartyEditor = ({party}) => {
    return (
        <div id="party-editor" className="combat-pane">
            <p className="combat-pane__title">Party Editor</p>
            <div className="button-panel">
                <button className="button" style={{flexGrow: 2}}>New Party Member</button>
                <button className="button" style={{flexGrow: 1}}>Save</button>
                <button className="button" style={{flexGrow: 1}}>Load</button>
            </div>
            <CombatantListContainer combatants={party} combatantType={PARTY} />
            <div className="button-panel" style={{display: "flex"}}>
                <button className="button">Clear</button>
            </div>
        </div>
    );
};

PartyEditor.propTypes = {
    party: PropTypes.arrayOf(PropTypes.instanceOf(CombatantModel)).isRequired
};

export default PartyEditor;