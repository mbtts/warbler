import React, { Component } from "react";

import FormField from "./FormField";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { login } from "../actions/user";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fields: {
        email: "",
        password: ""
      }
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({
      fields: { ...this.state.fields, [e.target.name]: e.target.value }
    });
  }

  async onSubmit(e) {
    e.preventDefault();

    const { email, password } = this.state.fields;

    this.props.onLogin(email, password);
  }

  render() {
    const { fields } = this.state;
    const { button, error } = this.props;

    return (
      <form onSubmit={this.onSubmit}>
        <h2>
          Welcome back, or <Link to="/register">register…</Link>
        </h2>
        {error ? <p className="error">{error}</p> : null}
        <FormField
          type="email"
          label="E-mail"
          name="email"
          value={fields.email}
          onChange={this.onChange}
        />
        <FormField
          type="password"
          label="Password"
          name="password"
          value={fields.password}
          onChange={this.onChange}
        />
        <p>
          <input
            type="submit"
            value={button.label}
            disabled={button.disabled}
          />
        </p>
      </form>
    );
  }
}

const mapStateToProps = state => ({
  button: {
    label: !state.progress.login.inProgress ? "Log in" : "Logging in...",
    disabled: state.progress.login.inProgress
  },
  error: state.progress.login.errorMessage
});

const mapDispatchToProps = dispatch => ({
  onLogin: (email, password) => dispatch(login(email, password))
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
