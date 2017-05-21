import React, { Component } from 'react';
import PropTypes from 'prop-types';
import "../composite.css";
import CombatantListContainer from "../containers/CombatantListContainer";
import {INITIATIVE} from "../CombatantType";
import CombatantModel from "../models/CombatantModel";
import Button from "./Button";

class InitiativeTracker extends Component {

    constructor(props) {
        super(props);
        this.state = {
            initiative: {
                turnIndex: -1,
                roundCount: 0
            }
        };
        this.getCombatantCount = this.getCombatantCount.bind(this);
        this.updateTurnIndex = this.updateTurnIndex.bind(this);
        this.initiativeController.rollInitiative = this.initiativeController.rollInitiative.bind(this);
        this.initiativeController.nextTurn = this.initiativeController.nextTurn.bind(this);
        this.initiativeController.prevTurn = this.initiativeController.prevTurn.bind(this);
        this.initiativeController.getTurnIndex = this.initiativeController.getTurnIndex.bind(this);
    }

    getCombatantCount() {
        return this.props.combatants.filter(c => { return c.inCombat; }).length;
    }

    updateTurnIndex(newIndex) {
        this.setState({
            initiative: {
                ...this.state.initiative,
                turnIndex: newIndex
            }
        })
    }

    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }

    initiativeController = {
        rollInitiative: function() {
            let newCombatants = [];
            this.props.combatants.forEach((combatant) => {
                let newCombatant;
                if (combatant.inCombat) {
                    let roll = this.getRandomInt(1, 21);
                    newCombatant = new CombatantModel(combatant);
                    newCombatant.initiative = roll + combatant.initMod;
                } else {
                    newCombatant = new CombatantModel(combatant);
                }
                newCombatants.push(newCombatant);
            });
            this.props.updateCombatants(newCombatants);
        },

        nextTurn: function() {
            let init = this.state.initiative.turnIndex;
            if (init < 0) {
                init = 0;
            } else {
                init++;
                if (init >= this.getCombatantCount()) {
                    init = 0;
                }
            }
            this.updateTurnIndex(init);
        },

        prevTurn: function() {
            let init = this.state.initiative.turnIndex;
            if (init < 0) {
                init = this.getCombatantCount() - 1;
            } else {
                init--;
                if (init < 0) {
                    init = this.getCombatantCount() - 1;
                }
            }
            this.updateTurnIndex(init);
        },

        getTurnIndex: function() {
            return this.state.initiative.turnIndex;
        }
    };

    render() {
        return (
            <div id="init-tracker" className="combat-pane">
                <p className="combat-pane__title">Initiative Tracker</p>
                <div className="button-panel">
                    <Button className="button" style={{flexGrow: 1}}
                            onClick={() => {
                                this.initiativeController.rollInitiative();
                            }}>Roll Initiative</Button>
                    <div style={{display: "flex", flexDirection: "column", flexBasis: "content"}}>
                        <Button className="button">Sort</Button>
                        <Button className="button">Reset</Button>
                    </div>
                </div>
                <CombatantListContainer
                    combatants={this.props.combatants}
                    combatantType={INITIATIVE}
                    updateCombatant={this.props.updateCombatant}
                    initController={this.initiativeController}
                />
                <div className="button-panel" style={{display: "flex"}}>
                    <Button className="button" style={{flexBasis: "content"}}
                            onClick={() => {this.initiativeController.prevTurn()}}>Prev Turn</Button>
                    <Button className="button" style={{flexGrow: 1}}
                            onClick={() => {this.initiativeController.nextTurn()}}>Next Turn</Button>
                </div>
            </div>
        );
    }
}

InitiativeTracker.propTypes = {
    combatants: PropTypes.arrayOf(PropTypes.instanceOf(CombatantModel)).isRequired,
    updateCombatant: PropTypes.func.isRequired,
    updateCombatants: PropTypes.func.isRequired
};

export default InitiativeTracker;