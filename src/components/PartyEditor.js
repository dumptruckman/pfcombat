import React from 'react';
import PropTypes from 'prop-types';
import "../composite.css";
import CombatantListContainer from "../containers/CombatantListContainer";
import {PARTY} from "../CombatantType";
import CombatantModel from "../models/CombatantModel";
import Button from "./Button";

const PartyEditor = ({party, updateCombatant}) => {
    return (
        <div id="party-editor" className="combat-pane">
            <p className="combat-pane__title">Party Editor</p>
            <div className="button-panel">
                <Button className="button" style={{flexGrow: 2}}>New Party Member</Button>
                <Button className="button" style={{flexGrow: 1}}>Save</Button>
                <Button className="button" style={{flexGrow: 1}}>Load</Button>
            </div>
            <CombatantListContainer
                combatants={party}
                combatantType={PARTY}
                updateCombatant={updateCombatant} />
            <div className="button-panel" style={{display: "flex"}}>
                <Button className="button">Clear</Button>
            </div>
        </div>
    );
};

PartyEditor.propTypes = {
    party: PropTypes.arrayOf(PropTypes.instanceOf(CombatantModel)).isRequired,
    updateCombatant: PropTypes.func.isRequired
};

export default PartyEditor;