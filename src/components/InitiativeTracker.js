import React, { Component } from 'react';
import PropTypes from 'prop-types';
import "../composite.css";
import CombatantListContainer from "../containers/CombatantListContainer";
import {INITIATIVE} from "../CombatantType";
import CombatantModel from "../models/CombatantModel";
import Button from "./Button";
import CombatantsController from "../controllers/CombatantsController";

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
        this.initiativeController.sortInitiative = this.initiativeController.sortInitiative.bind(this);
        this.initiativeController.nextTurn = this.initiativeController.nextTurn.bind(this);
        this.initiativeController.prevTurn = this.initiativeController.prevTurn.bind(this);
        this.initiativeController.getTurnIndex = this.initiativeController.getTurnIndex.bind(this);
    }

    getCombatantCount() {
        return this.props.combatantsController.getActiveCombatants().length;
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
            this.props.combatantsController.getAllCombatants().forEach((combatant) => {
                let newCombatant;
                if (combatant.inCombat) {
                    let roll = this.getRandomInt(1, 21);
                    newCombatant = new CombatantModel(combatant);
                    let initMod = combatant.initMod;
                    initMod = parseInt(initMod, 10);
                    if (isNaN(initMod)) {
                        initMod = 0;
                    }
                    newCombatant.initiative = roll + initMod;
                } else {
                    newCombatant = new CombatantModel(combatant);
                }
                newCombatants.push(newCombatant);
            });
            this.initiativeController.sortInitiative(newCombatants);
        },

        sortInitiative: function(prevCombatants = this.props.combatantsController.getAllCombatants()) {
            let newCombatants = [];
            let activeCombatants = prevCombatants.filter(c => c.inCombat).sort((a, b) => b.initiative - a.initiative);
            let i = 0;
            prevCombatants.forEach(combatant => {
                if (combatant.inCombat) {
                    newCombatants.splice(i, 1, new CombatantModel(activeCombatants[i]));
                    i++;
                } else {
                    newCombatants.splice(i, 1, new CombatantModel(combatant));
                }
            });
            this.props.combatantsController.updateCombatants(newCombatants);
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
                        <Button className="button"
                                onClick={() => {
                                    this.initiativeController.sortInitiative();
                                }}>Sort</Button>
                        <Button className="button">Reset</Button>
                    </div>
                </div>
                <CombatantListContainer
                    combatantsController={this.props.combatantsController}
                    combatantType={INITIATIVE}
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
    combatantsController: PropTypes.instanceOf(CombatantsController).isRequired,
    //combatantsController: PropTypes.object.isRequired,
};

export default InitiativeTracker;