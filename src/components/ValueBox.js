import React, { Component } from 'react';
import PropTypes from 'prop-types';
import "../composite.css";
import * as ReactDOM from "react-dom";

class ValueBox extends Component {

    constructor(props) {
        super(props);
        this.scrollClick = this.scrollClick.bind(this);
    }

    scrollClick(evt) {
        let bounds = this.button.getBoundingClientRect();
        let y = evt.pageY - bounds.top;
        let height = bounds.height;

        let v = parseInt(this.input.value, 10);
        if (isNaN(v)) {
            v = 0;
        }

        if (y < height / 2) {
            v++;
        } else {
            v--;
        }
        this.input.value = v;
        evt.stopPropagation();

        // TODO need to fire onchange somehow...
    }

    render() {
        return (
            <div className="combatant__info">
                <span className="combatant__combat-stats-label">{this.props.text}</span>
                <input title={this.props.title} className="input input--initiative" ref={input => {this.input = input}}
                       value={this.props.value} size={this.props.size} style={{width: this.props.size * 10}}
                       onClick={(e) => {
                           e.stopPropagation();
                           e.target.setSelectionRange(0, e.target.value.length);
                       }} onChange={this.props.onChange} />
                <button ref={button => {this.button = button}} style={!this.props.scroll ? {display: "none"} : {}}
                        onClick={this.scrollClick}><i className="fa fa-arrows-v fa-1" /></button>
            </div>
        );
    }

}

ValueBox.propTypes = {
    text: PropTypes.string.isRequired,
    value: PropTypes.node.isRequired,
    size: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    onChange: PropTypes.func,
    scroll: PropTypes.bool
};

export default ValueBox;