import React, { Component } from 'react';
import { connect } from 'react-redux';
import {push} from 'react-router-redux';

export default function(ComposedComponent) {
  class Authentication extends Component {
    static contextTypes = {
      router: React.PropTypes.object
    }

    componentDidMount() {
      if (!this.props.authenticated) {
        this.props.dispatch(push('/'));
      }
    }

    componentWillUpdate(nextProps) {
      if (!nextProps.authenticated) {
          this.props.dispatch(push('/'));
      }
    }

    render() {
      return <ComposedComponent {...this.props} />
    }
  }

  function mapStateToProps(state) {
    return { authenticated: state.auth.authenticated };
  }

  return connect(mapStateToProps)(Authentication);
}
