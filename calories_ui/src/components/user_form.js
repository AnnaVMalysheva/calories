import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import * as actions from '../actions';


const renderField = ({ input, label, type, meta: { touched, error, warning }}) => (
    <div>
      <label>{label}</label>
      <div>
        <input {...input} type={type} autoComplete="new-password"/>
          {touched && ((error && <div>{error}</div>))}
      </div>
    </div>
)


const validate = formProps => {
    const errors = {};

    if (!formProps.email) {
        errors.email = 'Please enter an email';
    }

    if (!formProps.password) {
        errors.password = 'Please enter a password';
    }

    if (!formProps.passwordConfirm) {
        errors.passwordConfirm = 'Please enter a password confirmation';
    }

    if (formProps.password !== formProps.passwordConfirm) {
        errors.password = 'Passwords must match';
    }

    return errors;
}

class UserForm extends Component {

  constructor(props) {
        super(props);
  }

  handleFormSubmit(formProps) {
    // Call action creator to sign up the user!
    this.props.signupUser(formProps);
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
    const { handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <fieldset className="form-group">
          <Field name="email" component={renderField} label="User email" type="text"/>
        </fieldset>
        <fieldset className="form-group">
          <Field name="password" component={renderField} label="User password" type="password" autoComplete="new-password"/>
        </fieldset>
        <fieldset className="form-group">
          <Field name="passwordConfirm" component={renderField} label="User password" type="password" autoComplete="new-password"/>
        </fieldset>
        <fieldset className="form-group">
          <label>Role:</label>
          <div>
            <Field name="role" component="select">
              <option value="select">select</option>
              <option value="ADMIN">ADMIN</option>
              <option value="USER">USER</option>
              <option value="MANAGER">MANAGER</option>
            </Field>
          </div>
        </fieldset>
        <fieldset className="form-group">
          <Field name="dailyExpect" component={renderField} label="Daily Expectation" type="text"/>
        </fieldset>
        {this.renderAlert()}
        <button action="submit" className="btn btn-primary">Sign up!</button>
      </form>
    );
  }
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error };
}

export default reduxForm({
  form: 'signup',
  validate
}, mapStateToProps, actions)(UserForm);

