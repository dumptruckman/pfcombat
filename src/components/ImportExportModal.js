import React, { Component } from "react";
import PropTypes from "prop-types";
import ModalWrapper from "./ModalWrapper";
import Button from "./Button";
import CombatantsController from "../controllers/CombatantsController";

class ImportExportModal extends Component {

  render() {
    const title = this.props.modalTarget ? "Party" : "Enemies";
    return (
      <ModalWrapper
        {...this.props}
        title={title}
        width={500}
        showOk={false}
      >
        <div style={{ display: "flex", flexGrow: 1 }}>
          <textarea style={{ flexGrow: 1, height: 100 }} placeholder="Copy or Paste here" />
        </div>
      </ModalWrapper>
    );
  }
}

ImportExportModal.propTypes = {
  modalTarget: PropTypes.bool.isRequired,
};

export default ImportExportModal;
