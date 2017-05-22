import React, { Component } from 'react';

class Button extends Component {

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        if (this.props.onClick) {
            this.props.onClick(e);
        }
        e.stopPropagation();
    }

    render() {
        return (
            <button
                className={this.props.className ? this.props.className : "button"}
                style={this.props.style ? this.props.style : {}}
                onClick={this.handleClick}
            >{this.props.children}</button>
        );
    }
}

export default Button;