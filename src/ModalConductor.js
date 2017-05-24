import React from "react";
import PropTypes from "prop-types";
import HPModal from "./components/HPModal";

const ModalConductor = (props) => {
  switch (props.currentModal) {
    case "CURRENT_HP":
      return <HPModal {...props} />;

    default:
      return null;
  }
};

ModalConductor.propTypes = {
  currentModal: PropTypes.string.isRequired,
};

export default ModalConductor;
