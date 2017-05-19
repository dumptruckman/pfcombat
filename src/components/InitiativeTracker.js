import React from 'react';
import PropTypes from 'prop-types';
import "../composite.css";
import CombatantListContainer from "../containers/CombatantListContainer";
import {INITIATIVE} from "../CombatantType";
import CombatantModel from "../models/CombatantModel";

const InitiativeTracker = ({combatants}) => {
    return (
        <div id="init-tracker" className="combat-pane">
            <p className="combat-pane__title">Initiative Tracker</p>
            <div className="button-panel">
                <button className="button" style={{flexGrow: 1}}>Roll Initiative</button>
                <div style={{display: "flex", flexDirection: "column", flexBasis: "content"}}>
                    <button className="button">Sort</button>
                    <button className="button">Reset</button>
                </div>
            </div>
            <CombatantListContainer combatants={combatants} combatantType={INITIATIVE} />
            <div className="button-panel" style={{display: "flex"}}>
                <button className="button" style={{flexBasis: "content"}}>Prev Turn</button>
                <button className="button" style={{flexGrow: 1}}>Next Turn</button>
            </div>
        </div>
    );
};

InitiativeTracker.propTypes = {
    combatants: PropTypes.arrayOf(PropTypes.instanceOf(CombatantModel)).isRequired
};

export default InitiativeTracker;