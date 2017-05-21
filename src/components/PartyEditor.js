import React from 'react';
import PropTypes from 'prop-types';
import "../composite.css";
import CombatantListContainer from "../containers/CombatantListContainer";
import {PARTY} from "../CombatantType";
import Button from "./Button";
import CombatantsController from "../controllers/CombatantsController";

const PartyEditor = ({combatantsController}) => {
    return (
        <div id="party-editor" className="combat-pane">
            <p className="combat-pane__title">Party Editor</p>
            <div className="button-panel">
                <Button className="button" style={{flexGrow: 2}}>New Party Member</Button>
                <Button className="button" style={{flexGrow: 1}}>Save</Button>
                <Button className="button" style={{flexGrow: 1}}>Load</Button>
            </div>
            <CombatantListContainer
                combatantsController={combatantsController}
                combatantType={PARTY} />
            <div className="button-panel" style={{display: "flex"}}>
                <Button className="button">Clear</Button>
            </div>
        </div>
    );
};

PartyEditor.propTypes = {
    combatantsController: PropTypes.instanceOf(CombatantsController).isRequired,
};

export default PartyEditor;