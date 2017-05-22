import React, { Component } from 'react';
import PropTypes from 'prop-types';
import "../composite.css";
import "../font-awesome.css";
import CombatantListContainer from "../containers/CombatantListContainer";
import {INITIATIVE} from "../CombatantType";
import Button from "./Button";
import CombatantsController from "../controllers/CombatantsController";
import InitiativeController from "../controllers/InitiativeController";

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

    initiativeController = new InitiativeController();

    render() {
        return (
            <div id="init-tracker" className="combat-pane">
                <p className="combat-pane__title">Initiative Tracker</p>
                <div className="button-panel">
                    <Button className="button" style={{flexGrow: 1}}
                            onClick={() => {
                                this.initiativeController.rollInitiative();
                            }}><i className="fa fa-random fa-2x" aria-hidden="true"/>Roll Initiative</Button>
                    <div style={{display: "flex", flexDirection: "column", flexBasis: "content"}}>
                        <Button className="button"
                                onClick={() => {
                                    this.initiativeController.sortInitiative();
                                }}><i className="fa fa-sort-numeric-desc" aria-hidden="true"/>Sort</Button>
                        <Button className="button"><i className="fa fa-undo" aria-hidden="true"/>Reset</Button>
                    </div>
                </div>
                <CombatantListContainer
                    combatantsController={this.props.combatantsController}
                    combatantType={INITIATIVE}
                    initController={this.initiativeController}
                />
                <div className="button-panel" style={{display: "flex"}}>
                    <Button className="button" style={{flexBasis: "content"}}
                            onClick={() => {this.initiativeController.prevTurn()}}>
                        <i className="fa fa-arrow-left fa-lg" aria-hidden="true"/>Prev Turn</Button>
                    <Button className="button" style={{flexGrow: 1}}
                            onClick={() => {this.initiativeController.nextTurn()}}>
                        Next Turn<i className="fa fa-arrow-right fa-2x" aria-hidden="true"/></Button>
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