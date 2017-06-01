import React from "react";
import PropTypes from "prop-types";
import Radium from "radium";

const styles = {
  base: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
  },
};

const CombatantWrapper = props => (
  // eslint-disable-next-line jsx-a11y/no-static-element-interactions
  <div
    style={[styles.base]}
    role="presentation"
    onClick={() => {
      props.onClick(props.index);
    }}
    onContextMenu={e => e.preventDefault()}
  >
    {props.children}
  </div>
);

CombatantWrapper.propTypes = {
  index: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.element,
  ]).isRequired,
};

export default Radium(CombatantWrapper);
