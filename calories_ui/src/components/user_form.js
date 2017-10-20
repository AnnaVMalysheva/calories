import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import {signupUser} from '../actions';


const renderField = ({ input, label, type, meta: { touched, error, warning }}) => (
    <div>
      <label>{label}</label>
      <div>
        <input {...input} type={type} autoComplete="new-password"/>
          {touched && ((error && <div>{error}</div>))}
      </div>
    </div>
)


const validate = (formProps) => {
    const errors = {};

    if (formProps) {

    if (!formProps.email) {
        errors.email = 'Please enter an email';
    }

    if(!formProps.id) {

        if (!formProps.password) {
            errors.password = 'Please enter a password';
        }

        if (!formProps.passwordConfirm) {
            errors.passwordConfirm = 'Please enter a password confirmation';
        }

    }
        if (formProps.password !== formProps.passwordConfirm) {
            errors.password = 'Passwords must match';
        }
    }
    return errors;
}

const required = (value, allValues, props) => (value ? undefined : 'Required')

class UserForm extends Component {

  constructor(props) {
        super(props);
  }

   componentDidMount() {
      this.state={mode : this.props.mode}
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
          <Field name="username" component={renderField} label="User email" type="text"/>
        </fieldset>
        <fieldset className="form-group">
          <Field name="password" component={renderField} label="User password" type="password" autoComplete="new-password" validate={[required]}/>
        </fieldset>
        <fieldset className="form-group">
          <Field name="passwordConfirm" component={renderField} label="User password confirmation" type="password" autoComplete="new-password"/>
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
          <Field name="dailyExpectation" component={renderField} label="Daily Expectation" type="text"/>
        </fieldset>
        {this.renderAlert()}
        <button action="submit" className="btn btn-primary">Sign up!</button>
      </form>
    );
  }
}


// export default reduxForm({
//   form: 'signup',
//   validate
// }, null, {signupUser})(UserForm);


const CreateUserForm = props => {

   return <UserForm {...props} mode={'create'}/>;
}
const EditUserForm = props =>
    <UserForm {...props} mode={'edit'} />;


export const ConnectedCreateUserForm = reduxForm( {form: 'createUser',
    validate
}, null, {signupUser})(CreateUserForm);
export const ConnectedEditUserForm = reduxForm({form: 'editUser',
    validate
}, null, {signupUser})(EditUserForm);