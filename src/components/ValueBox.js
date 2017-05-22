import React from 'react';
import PropTypes from 'prop-types';
import "../composite.css";

const ValueBox = ({text, value, size, title, onChange}) => {
    return (
        <div className="combatant__info">
            <span className="combatant__combat-stats-label">{text}</span>
            <input title={title} className="input input--initiative"
                   value={value} size={size} style={{width: size * 10}}
                   onClick={(e) => {
                       e.stopPropagation();
                       e.target.setSelectionRange(0, e.target.value.length);
                   }} onChange={onChange} />
        </div>
    );
};

ValueBox.propTypes = {
    text: PropTypes.string.isRequired,
    value: PropTypes.node.isRequired,
    size: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    onChange: PropTypes.func
};

export default ValueBox;