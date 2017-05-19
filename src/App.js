import React, { Component } from 'react';
import './App.css';
import {ENEMY, INITIATIVE, PARTY} from "./CombatantType";
import CombatantList from "./components/CombatantList";
import CombatantModel from "./models/CombatantModel";
import CombatantListContainer from "./containers/CombatantListContainer";

class App extends Component {
    render() {
        let party = [new CombatantModel("Johnny"), new CombatantModel("Linus")];
        let enemies = [new CombatantModel("Orc 1"), new CombatantModel("Orc 2"), new CombatantModel("Orc Chieftan")];
        let combatants = party.concat(enemies);
        return (
            <div id="combat-tab" className="tab">
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

                <div id="party-editor" className="combat-pane">
                    <p className="combat-pane__title">Monster Editor</p>
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
            </div>
        );
    }
}

export default App;
