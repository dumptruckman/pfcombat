import React, { Component } from 'react';
import './App.css';
import InitiativeTracker from "./components/InitiativeTracker";
import PartyEditor from "./components/PartyEditor";
import EnemyEditor from "./components/EnemyEditor";
import CombatantsController from "./controllers/CombatantsController";
import ModalConductor from "./ModalConductor";

class App extends Component {

    constructor() {
        super();
        this.state = {
            combatants: {},
            currentModal: null,
            modalTarget: null,
        };
        this.combatantsController.updateCombatant = this.combatantsController.updateCombatant.bind(this);
        this.combatantsController.setCombatantProp = this.combatantsController.setCombatantProp.bind(this);
        this.combatantsController.addCombatant = this.combatantsController.addCombatant.bind(this);
        this.combatantsController.createCombatant = this.combatantsController.createCombatant.bind(this);
        this.combatantsController.removeCombatant = this.combatantsController.removeCombatant.bind(this);
        this.combatantsController.removeCombatants = this.combatantsController.removeCombatants.bind(this);
        this.combatantsController.updateCombatants = this.combatantsController.updateCombatants.bind(this);
        this.combatantsController.getParty = this.combatantsController.getParty.bind(this);
        this.combatantsController.getEnemies = this.combatantsController.getEnemies.bind(this);
        this.combatantsController.getActiveCombatants = this.combatantsController.getActiveCombatants.bind(this);
        this.combatantsController.getAllCombatants = this.combatantsController.getAllCombatants.bind(this);
        this.combatantsController.getCombatant = this.combatantsController.getCombatant.bind(this);
        this.combatantsController.showCurrentHpDialog = this.combatantsController.showCurrentHpDialog.bind(this);
        this.combatantsController.getCombatantById = this.combatantsController.getCombatantById.bind(this);
        this.combatantsController.getCombatantByName = this.combatantsController.getCombatantByName.bind(this);
        this.hideModal = this.hideModal.bind(this);
    }

    combatantsController = new CombatantsController();

    componentWillMount() {
        let combatants = {};
        let c = this.combatantsController.createCombatant(true, combatants);
        combatants = {...combatants, [c.id]: c};
        c = this.combatantsController.createCombatant(true, combatants);
        combatants = {...combatants, [c.id]: c};
        c = this.combatantsController.createCombatant(false, combatants);
        combatants = {...combatants, [c.id]: c};
        c = this.combatantsController.createCombatant(false, combatants);
        combatants = {...combatants, [c.id]: c};
        c = this.combatantsController.createCombatant(false, combatants);
        combatants = {...combatants, [c.id]: c};
        this.setState({
            combatants: combatants
        });
    }

    hideModal() {
        this.setState({
            modalTarget: null,
            currentModal: null
        });
    }

    render() {
        return (
            <div>
                <div id="combat-tab" className="tab">
                    <InitiativeTracker combatantsController={this.combatantsController} />
                    <PartyEditor combatantsController={this.combatantsController} />
                    <EnemyEditor combatantsController={this.combatantsController} />
                </div>
                <div>
                    <ModalConductor currentModal={this.state.currentModal}
                                    modalTarget={this.state.modalTarget}
                                    combatantsController={this.combatantsController}
                                    hideModal={this.hideModal} />
                </div>
            </div>
        );
    }
}



export default App;
