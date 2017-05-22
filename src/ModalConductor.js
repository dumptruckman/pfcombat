import React from 'react';
import HPModal from "./components/HPModal";

const ModalConductor = props => {
    switch (props.currentModal) {
        case 'CURRENT_HP':
            return <HPModal {...props}/>;

        default:
            return null;
    }
};

export default ModalConductor;