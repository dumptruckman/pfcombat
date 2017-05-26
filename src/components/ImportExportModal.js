import React, { Component } from "react";
import PropTypes from "prop-types";
import ModalWrapper from "./ModalWrapper";
import Button from "./Button";
import CombatantsController from "../controllers/CombatantsController";
import CombatantModel from "../models/CombatantModel";

class ImportExportModal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      status: "",
    };
    this.importData = this.importData.bind(this);
    this.exportData = this.exportData.bind(this);
  }

  importData() {
    let status = "";
    try {
      const imported = JSON.parse(this.textArea.value);
      if (imported.constructor === Array) {
        let errors = 0;
        imported.forEach((val) => {
          if (typeof val === "object") {
            const combatant = new CombatantModel(val)
            this.props.combatantsController.addCombatant(combatant);
          } else {
            errors += 1;
            if (status.length !== 0) {
              status += "; ";
            } else {
              status += "data partially imported: ";
            }
            status += "skipped malformed combatant";
          }
        });
        if (errors > 0) {
          status = `Data partially imported: ${errors} combatant(s) skipped due to malformed data.`;
        } else {
          status = "Import successful!";
        }
      } else {
        status = "Failed to import: data is malformed.";
      }
    } catch (e) {
      status = "Failed to import: data should be in JSON format.";
    }
    this.textArea.focus();
    this.textArea.setSelectionRange(0, this.textArea.value.length);
    this.setState({
      status,
    });
  }

  exportData() {
    let combatants = [...(this.props.modalTarget
        ? this.props.combatantsController.getParty()
        : this.props.combatantsController.getEnemies())];
    combatants = combatants.map((c) => {
      const combatant = new CombatantModel(c);
      delete combatant.id;
      delete combatant.inCombat;
      delete combatant.ready;
      delete combatant.delay;
      return combatant;
    });
    this.textArea.value = JSON.stringify(combatants, null, 0);
    this.textArea.focus();
    this.textArea.setSelectionRange(0, this.textArea.value.length);
    document.execCommand("copy");
    const title = this.props.modalTarget ? "Party" : "Enemies";
    this.setState({
      status: `${title} data exported and has been copied to the clipboard`,
    });
  }

  render() {
    const title = this.props.modalTarget ? "Party" : "Enemies";
    return (
      <ModalWrapper
        {...this.props}
        title={title}
        // width={500}
        showOk={false}
        style={{ maxWidth: 500, width: "100%", minHeight: 150, maxHeight: 200, height: "100%" }}
      >
        <div style={{ display: "flex", flexGrow: 1, flexDirection: "column" }}>
          <div style={{ display: "flex", flexGrow: 1 }}>
            <textarea
              rows="5"
              style={{ flexGrow: 1, height: "100%" }}
              placeholder="Copy or Paste here"
              ref={(textArea) => { this.textArea = textArea; }}
            />
          </div>
          <div style={{ display: "flex" }}>
            <Button
              style={{ flexGrow: 1 }}
              onClick={this.importData}
            >Import</Button>
            <Button
              style={{ flexGrow: 1 }}
              onClick={this.exportData}
            >Export</Button>
          </div>
          <div style={{ display: "flex" }}>
            <span>Status: {this.state.status}</span>
          </div>
        </div>
      </ModalWrapper>
    );
  }
}

ImportExportModal.propTypes = {
  combatantsController: PropTypes.instanceOf(CombatantsController).isRequired,
  modalTarget: PropTypes.bool.isRequired,
};

export default ImportExportModal;
