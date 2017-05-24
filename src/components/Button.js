import React, { Component } from "react";
import PropTypes from "prop-types";

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
        className={this.props.className}
        style={this.props.style}
        onClick={this.handleClick}
      >{this.props.children}</button>
    );
  }
}

Button.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.node,
  style: PropTypes.objectOf(PropTypes.node),
  className: PropTypes.string,
};

Button.defaultProps = {
  onClick() {},
  children: "",
  style: {},
  className: "button",
};

export default Button;
