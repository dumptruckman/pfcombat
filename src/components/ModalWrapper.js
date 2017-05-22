import React from 'react';
import PropTypes from 'prop-types';
import Button from "./Button";

const ModalWrapper = props => {
    const handleBackgroundClick = e => {
        if (e.target === e.currentTarget) props.hideModal();
    };

    const onOk = () => {
        props.onOk();
        props.hideModal();
    };

    const okButton = props.showOk
        ? (
            <Button
                onClick={onOk}
                disabled={props.okDisabled}
            >
                {props.okText}
            </Button>
        ) : null;

    return (
        <div onClick={handleBackgroundClick} className="modal-dialog">
            <header>
                <h1>{props.title}</h1>

                <Button onClick={props.hideModal}>Close</Button>
            </header>

            {props.children}

            {okButton}
        </div>
    );
};

ModalWrapper.propTypes = {
    // props
    title: PropTypes.string,
    showOk: PropTypes.bool,
    okText: PropTypes.string,
    okDisabled: PropTypes.bool,
    width: PropTypes.number,
    style: PropTypes.object,
    children: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.element,
        PropTypes.string,
    ]).isRequired,

    // methods
    hideModal: PropTypes.func,
    onOk: PropTypes.func,
};

ModalWrapper.defaultProps = {
    title: '',
    showOk: true,
    okText: 'OK',
    okDisabled: false,
    width: 400,
    onOk: () => {}
};

export default ModalWrapper;