import React from 'react';
import ModalWrapper from "./ModalWrapper";

const HPModal = props => {
    let combatant = props.combatantsController.getCombatantById(props.modalTarget);

    return (
        <ModalWrapper
            {...props}
            title={combatant.name}
            width={300}
            showOk={false}
        >
            <button>x</button>
        </ModalWrapper>
    );
};

export default HPModal;