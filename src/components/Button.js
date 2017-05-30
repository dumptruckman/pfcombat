import React, { Component } from "react";
import PropTypes from "prop-types";
import Radium from "radium";

const activeButtonStyle = {
  border: "1px solid #415C1B",
  color: "#69932B",
  boxShadow: "inset 0 1px 0 0 #F4FAED,inset 0 -1px 0 0 #69932B,inset 0 0 0 1px #ADD76F",
  backgroundColor: "#E0F0C9",
};

const styles = {
  base: {
    margin: 1,

    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    border: "1px solid #69932B",
    borderRadius: "3px 3px 3px 3px",
    width: "auto",
    height: "auto",
    fontSize: "16px",
    padding: "5px 10px",
    backgroundColor: "#C1E193",
  },

  normal: {
    boxShadow: "inset 0 1px 0 0 #F4FAED,inset 0 -1px 0 0 #69932B," +
          "inset 0 0 0 1px #ADD76F,0 2px 4px 0 #3E240F",
    textShadow: "0 1px 0 #FFFFFF",

    ":hover": activeButtonStyle,

    ":active": activeButtonStyle,
  },

  large: {
    padding: "10px 20px",
    fontSize: 20,
  },

  disabled: {
    backgroundColor: "#c3c3c3",
    opacity: 0.4,
    cursor: "not-allowed",
  },

  grow: {
    flexGrow: 1,
  },

  altColor: { // this really isn't ready for use...
    backgroundColor: "#E18335",
  },
};

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
        style={[
          styles.base,
          this.props.disabled ? styles.disabled : styles.normal,
          this.props.large && styles.large,
          this.props.grow && styles.grow,
          this.props.altColor && styles.altColor,
          this.props.style,
        ]}
        onClick={this.handleClick}
      >{this.props.children}</button>
    );
  }
}

Button.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.node,
  style: PropTypes.objectOf(PropTypes.node),
  disabled: PropTypes.bool,
  grow: PropTypes.bool,
  large: PropTypes.bool,
  altColor: PropTypes.bool,
};

Button.defaultProps = {
  onClick() {},
  children: "",
  style: {},
  disabled: false,
  grow: false,
  large: false,
  altColor: false,
};

export default Radium(Button);
