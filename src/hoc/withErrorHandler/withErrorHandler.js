import React, {Component} from "react";
import Modal from "../../components/UI/Modal/Modal.js";

const withErrorHandler = (WrappedComponent, axios) => {

  return class extends Component {

    constructor(props) {
      super(props);

      this.state = {
        error: null
      };

      this.reqInterceptor = axios.interceptors.request.use(request => {
        this.setState({error: null});
        return request;
      });

      //intercept all axios responses, if it's NOT and error just return it, if it's an error update the state
      this.resInterceptor = axios.interceptors.response.use(
        response => response,
        error => {
          this.setState({error: error});
        }
      );
    }

    //this removes the interceptors when the component unmounts, so the app doesn't accrue unnecessary interceptors
    componentWillUnmount() {
      console.log('unmounting ', this.reqInterceptor, this.resInterceptor);
      axios.interceptors.request.eject(this.reqInterceptor);
      axios.interceptors.response.eject(this.resInterceptor);
    }

    closeModal() {
      this.setState({error: null});
    }

    render() {
      return (
        <React.Fragment>
          <Modal show={this.state.error} modalClosed={() => this.closeModal()}>
            {/* if the state reflects a response error, display the error in a modal */}
            {this.state.error ? this.state.error.message : null}
          </Modal>

          <WrappedComponent {...this.props} />
        </React.Fragment>
      );
    }
  };
};

export default withErrorHandler;
