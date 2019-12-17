import React, {Component} from "react";
import classes from "./Modal.module.css";
import Backdrop from "../Backdrop/Backdrop.js";

class Modal extends Component {

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.children !== this.props.children || 
      nextProps.show !== this.props.show) 
    {
      return true;
    } else {
      return false;
    }
  }
  
  render() {
    return (
      <React.Fragment>
        <Backdrop show={this.props.show} closed={this.props.modalClosed} />
        <div
          className={classes.Modal}
          style={{
            transform: this.props.show ? "translateY(0)" : "translateY(-100vh)",
            opacity: this.props.show ? "1" : "0"
          }}>
          {this.props.children}
        </div>
      </React.Fragment>
    );
  }
}

export default Modal;
