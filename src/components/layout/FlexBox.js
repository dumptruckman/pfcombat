import React from "react";
import PropTypes from "prop-types";
import Radium from "radium";

const styles = {
  base: {
    display: "flex",
    alignContent: "center",
  },
  vertical: {
    flexDirection: "column",
  },
  spaceBetween: {
    justifyContent: "space-between",
  },
  spaceAround: {
    justifyContent: "space-around",
  },
  wrap: {
    flexWrap: "wrap",
  },
  hidden: {
    display: "none",
  },
  grow: {
    flexGrow: 1,
  },
};

const FlexBox = props => (
  <div
    style={[
      styles.base,
      props.vertical && styles.vertical,
      props.spaceAround && styles.spaceAround,
      props.spaceBetween && styles.spaceBetween,
      props.grow && styles.grow,
      props.wrap && styles.wrap,
      props.style,
      props.hidden && styles.hidden,
    ]}
  >
    {props.children}
  </div>
);

FlexBox.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.element,
  ]).isRequired,
  style: PropTypes.objectOf(PropTypes.node),
  vertical: PropTypes.bool,
  hidden: PropTypes.bool,
  spaceBetween: PropTypes.bool,
  spaceAround: PropTypes.bool,
  wrap: PropTypes.bool,
  grow: PropTypes.bool,
};

FlexBox.defaultProps = {
  style: {},
  vertical: false,
  hidden: false,
  spaceBetween: false,
  spaceAround: false,
  wrap: false,
  grow: false,
};

export default Radium(FlexBox);
