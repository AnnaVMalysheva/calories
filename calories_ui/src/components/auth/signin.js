import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux'
import {signinUser} from '../../actions/index';

class Signin extends Component {
  handleFormSubmit({ email, password }) {
    // Need to do something to log user in
    this.props.signinUser({ email, password });
  }

  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div className="alert alert-danger">
          <strong>Oops!</strong> {this.props.errorMessage}
        </div>
      );
    }
  }

  render() {
    const { handleSubmit} = this.props;

    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <fieldset className="form-group">
          <label>Email:</label>
            <div>
                <Field
                    name="email"
                    component="input"
                    type="text"
                    placeholder="Email"
                />
            </div>
        </fieldset>
        <fieldset className="form-group">
          <label>Password:</label>
            <div>
                <Field
                    name="password"
                    component="input"
                    type="text"
                    placeholder="password"
                />
            </div>
        </fieldset>
        {this.renderAlert()}
        <button action="submit" className="btn btn-primary">Sign in</button>
      </form>
    );
  }
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error };
}

Signin = reduxForm({
    form: 'signin'
})(Signin);


Signin = connect(mapStateToProps, {signinUser})(Signin);

export default Signin;
