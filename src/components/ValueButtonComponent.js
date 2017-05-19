import React from 'react';
import PropTypes from 'prop-types';
import "../composite.css";

const ValueButtonComponent = ({text, value}) => {
    return (
        <div className="combatant__info">
            <span className="combatant__combat-stats-label">{text}</span>
            <button className="button button--hp">{value}</button>
        </div>
    );
};

ValueButtonComponent.propTypes = {
    text: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired
};

export default ValueButtonComponent;