import React from "react";
import PropTypes from "prop-types";
import Button from "./Button";

const ModalWrapper = (props) => {
  const handleBackgroundClick = (e) => {
    if (e.target === e.currentTarget) props.hideModal();
  };

  const onOk = () => {
    props.onOk();
    props.hideModal();
  };

  const okButton = props.showOk
        ? (
          <Button
            onClick={onOk}
            disabled={props.okDisabled}
          >
            {props.okText}
          </Button>
        ) : null;

  let style = { display: "flex", flexDirection: "column" };
  style.width = props.width;
  style = { ...style, ...props.style };
  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div
      onClick={handleBackgroundClick}
      className="overlay overlay--dark"
      role="presentation"
    >
      <div className="modal-dialog" style={style}>
        <header>
          <h1>{props.title}</h1>

          <Button onClick={props.hideModal} style={{ fontSize: 12 }}>Close</Button>
        </header>

        <div className="modal-dialog-contents" style={{ display: "flex" }}>
          {props.children}
        </div>

        {okButton}
      </div>
    </div>
  );
};

ModalWrapper.propTypes = {
    // props
  title: PropTypes.string,
  showOk: PropTypes.bool,
  okText: PropTypes.string,
  okDisabled: PropTypes.bool,
  width: PropTypes.number,
  style: PropTypes.objectOf(PropTypes.node),
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.element,
    PropTypes.string,
  ]).isRequired,

    // methods
  hideModal: PropTypes.func,
  onOk: PropTypes.func,
};

ModalWrapper.defaultProps = {
  title: "",
  showOk: true,
  okText: "OK",
  okDisabled: false,
  width: 400,
  onOk: () => {},
  style: {},
};

export default ModalWrapper;
