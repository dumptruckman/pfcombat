import React, { Component } from "react";
import PropTypes from "prop-types";
import "../composite.css";

class ValueBox extends Component {

  constructor(props) {
    super(props);
    this.scrollClick = this.scrollClick.bind(this);
  }

  scrollClick(evt) {
    const bounds = this.button.getBoundingClientRect();
    const y = evt.pageY - bounds.top;
    const height = bounds.height;

    let v = parseInt(this.input.value, 10);
    if (isNaN(v)) {
      v = 0;
    }

    if (y < height / 2) {
      v += 1;
    } else {
      v -= 1;
    }

    this.props.onChange(v);

    evt.stopPropagation();
  }

  render() {
    return (
      <div className="combatant__info">
        <span className="combatant__combat-stats-label">{this.props.text}</span>
        <input
          title={this.props.title}
          className="input input--initiative"
          ref={(input) => { this.input = input; }}
          value={this.props.value}
          size={this.props.size}
          style={{ width: this.props.size * 10 }}
          placeholder={this.props.placeholder}
          onClick={(e) => {
            e.stopPropagation();
            e.target.setSelectionRange(0, e.target.value.length);
          }}
          onChange={e => this.props.onChange(e.target.value)}
        />
        <button
          ref={(button) => { this.button = button; }}
          style={!this.props.scroll ? { display: "none" } : {}}
          onClick={this.scrollClick}
        ><i className="fa fa-arrows-v fa-1" /></button>
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
  scroll: PropTypes.bool,
  placeholder: PropTypes.string,
};

ValueBox.defaultProps = {
  onChange() {},
  scroll: false,
  placeholder: "",
};

export default ValueBox;
