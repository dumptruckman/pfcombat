import React from 'react';
import PropTypes from 'prop-types';
import "../composite.css";
import Button from "./Button";

const ValueButton = ({text, value, onClick, style}) => {
    return (
        <div className="combatant__info">
            <span className="combatant__combat-stats-label">{text}</span>
            <Button className="value-button" style={style ? style : {}} onClick={onClick}>{value}</Button>
        </div>
    );
};

ValueButton.propTypes = {
    text: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
    onClick: PropTypes.func,
    style: PropTypes.object
};

export default ValueButton;