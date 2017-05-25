import React from "react";
import PropTypes from "prop-types";
import HPModal from "./components/HPModal";
import ImportExportModal from "./components/ImportExportModal";

const ModalConductor = (props) => {
  switch (props.currentModal) {
    case "CURRENT_HP":
      return <HPModal {...props} />;
    case "IMPORT_EXPORT":
      return <ImportExportModal {...props} />
    default:
      return null;
  }
};

ModalConductor.propTypes = {
  currentModal: PropTypes.string,
};

ModalConductor.defaultProps = {
  currentModal: null,
};

export default ModalConductor;
