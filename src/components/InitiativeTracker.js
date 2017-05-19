import React from 'react';
import PropTypes from 'prop-types';
import "../composite.css";
import CombatantListContainer from "../containers/CombatantListContainer";
import {INITIATIVE} from "../CombatantType";
import CombatantModel from "../models/CombatantModel";
import Button from "./Button";

const InitiativeTracker = ({combatants}) => {
    return (
        <div id="init-tracker" className="combat-pane">
            <p className="combat-pane__title">Initiative Tracker</p>
            <div className="button-panel">
                <Button className="button" style={{flexGrow: 1}}>Roll Initiative</Button>
                <div style={{display: "flex", flexDirection: "column", flexBasis: "content"}}>
                    <Button className="button">Sort</Button>
                    <Button className="button">Reset</Button>
                </div>
            </div>
            <CombatantListContainer combatants={combatants} combatantType={INITIATIVE} />
            <div className="button-panel" style={{display: "flex"}}>
                <Button className="button" style={{flexBasis: "content"}}>Prev Turn</Button>
                <Button className="button" style={{flexGrow: 1}}>Next Turn</Button>
            </div>
        </div>
    );
};

InitiativeTracker.propTypes = {
    combatants: PropTypes.arrayOf(PropTypes.instanceOf(CombatantModel)).isRequired
};

export default InitiativeTracker;