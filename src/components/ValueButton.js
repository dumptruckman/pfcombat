import React from 'react';
import PropTypes from 'prop-types';
import "../composite.css";
import Button from "./Button";

const ValueButton = ({text, value, onClick}) => {
    return (
        <div className="combatant__info">
            <span className="combatant__combat-stats-label">{text}</span>
            <Button className="button button--hp" onClick={onClick}>{value}</Button>
        </div>
    );
};

ValueButton.propTypes = {
    text: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
    onClick: PropTypes.func
};

export default ValueButton;