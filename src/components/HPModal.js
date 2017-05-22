import React from 'react';
import ModalWrapper from "./ModalWrapper";

const HPModal = props => {
    return (
        <ModalWrapper
            {...props}
            title={props.combatant.name}
            width={300}
            showOk={false}
        >
            <button>x</button>
        </ModalWrapper>
    );
};

export default HPModal;