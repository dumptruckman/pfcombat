import React, { Component } from "react";
import PropTypes from "prop-types";
import "../composite.css";

class ValueBox extends Component {

  constructor(props) {
    super(props);
    this.scrollClick = this.scrollClick.bind(this);
    this.scroll = this.scroll.bind(this);
    this.repeatScroll = this.repeatScroll.bind(this);
    this.scrollMouseUp = this.scrollMouseUp.bind(this);
    this.timeout = undefined;
    this.start = undefined;
    this.speedup = 1.2;
    this.event = undefined;
  }

  scroll(evt) {
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
  }

  scrollClick(evt) {
    this.event = { ...evt };
    this.start = 250;
    evt.stopPropagation();
    this.repeatScroll();
  }

  scrollMouseUp() {
    clearTimeout(this.timeout);
    this.event = undefined;
    this.start = 250;
  }

  repeatScroll() {
    this.scroll(this.event);
    this.timeout = setTimeout(this.repeatScroll, this.start);
    this.start = this.start / this.speedup;
  }

  render() {
    const style = {};
    if (this.props.size) {
      style.width = this.props.size * 10;
    }
    return (
      <div className="combatant__info" style={this.props.style}>
        <span className="combatant__combat-stats-label">{this.props.text}</span>
        <input
          title={this.props.title}
          className={this.props.className}
          ref={(input) => { this.input = input; }}
          value={this.props.value}
          size={this.props.size}
          style={style}
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
          onClick={(e) => { e.stopPropagation(); }}
          onMouseDown={this.scrollClick}
          onMouseUp={this.scrollMouseUp}
        ><i className="fa fa-arrows-v fa-1" /></button>
      </div>
    );
  }

}

ValueBox.propTypes = {
  text: PropTypes.string.isRequired,
  value: PropTypes.node.isRequired,
  size: PropTypes.number,
  className: PropTypes.string,
  style: PropTypes.objectOf(PropTypes.node),
  title: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  scroll: PropTypes.bool,
  placeholder: PropTypes.string,
};

ValueBox.defaultProps = {
  onChange() {},
  className: "input",
  scroll: false,
  style: {},
  placeholder: "",
  size: undefined,
};

export default ValueBox;
