import React, {Component} from 'react';
import Modal from '../../components/UI/Modal/Modal.js';

const withErrorHandler = (WrappedComponent, axios ) => {
  return class extends Component {
    state = {
      error: null,
    }

    componentDidMount () {
      //the request interceptor will watch all axios requests.
      //this doesn't seem to actually do anything.
      axios.interceptors.request.use(request => {
        this.setState({error: null});
        return request;
      });
      //intercept all axios responses, if it's NOT and error just return it, if it's an error update the state
      axios.interceptors.response.use(response => response, error => {
        this.setState({error: error});
      });
    }

    closeModal() {
      this.setState({error: null});
    }

    render() {
      return (
        <React.Fragment>
          <Modal 
            show={this.state.error}
            modalClosed={() => this.closeModal()}>
              {/* if the state reflects a response error, display the error in a modal */}
              {this.state.error ? this.state.error.message : null}
          </Modal>
  
          <WrappedComponent {...this.props} />
        </React.Fragment>
      );
    };
  }
}

export default withErrorHandler;