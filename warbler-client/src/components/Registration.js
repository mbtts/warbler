import React, { Component } from "react";

import FormField from "./FormField";
import { connect } from "react-redux";
import { register } from "../actions/user";

class NewPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      username: "",
      password: "",
      profileImageUrl: ""
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    const { email, username, password, profileImageUrl } = this.state;
    this.props.onRegister(email, username, password, profileImageUrl);
  }

  render() {
    const { email, username, password, profileImageUrl } = this.state;
    const { button, error } = this.props;
    return (
      <form onSubmit={this.onSubmit}>
        <h2>Join Warbler today.</h2>
        {error ? <p className="error">{error}</p> : null}
        <FormField
          type="email"
          label="E-mail"
          name="email"
          value={email}
          onChange={this.onChange}
        />
        <FormField
          label="Username"
          name="username"
          value={username}
          onChange={this.onChange}
        />
        <FormField
          type="password"
          label="Password"
          name="password"
          value={password}
          onChange={this.onChange}
        />
        <FormField
          label="Image URL"
          name="profileImageUrl"
          value={profileImageUrl}
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
  user: state.user,
  button: {
    label: !state.progress.register.inProgress ? "Register" : "Registering...",
    disabled: state.progress.register.inProgress
  },
  error: state.progress.register.errorMessage,
  completed: state.progress.register.completed
});

const mapDispatchToProps = dispatch => ({
  onRegister: (email, username, password, profileImageUrl) =>
    dispatch(register(email, username, password, profileImageUrl))
});

export default connect(mapStateToProps, mapDispatchToProps)(NewPost);
