import React from "react";
import PropTypes from "prop-types";
import Radium from "radium";

const FullPageWebApp = (props) => {
  const styles = {
    base: {
      display: "flex",
      height: "100%",
      width: "100%",
      flexDirection: "column",
      position: "fixed",
    },
  };

  return (
    <div style={styles.base}>
      {props.children}
    </div>
  );
};

FullPageWebApp.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.element,
  ]).isRequired,
};

export default Radium(FullPageWebApp);
