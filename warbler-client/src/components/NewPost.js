import React, { Component } from "react";
import { createMessage, createMessageReset } from "../actions/message";

import { connect } from "react-redux";

class NewPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: ""
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.completed) {
      this.props.onPostCreated();
      this.props.history.push("/");
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    const { userId, token } = this.props.user;
    this.props.onCreatePost(this.state.text, userId, token);
  }

  render() {
    const { button, error } = this.props;
    return (
      <React.Fragment>
        <h2>New Post</h2>
        {error ? <p className="error">{error}</p> : null}
        <form onSubmit={this.onSubmit}>
          <p>
            <textarea
              id="text"
              name="text"
              onChange={this.onChange}
              value={this.state.text}
            />
          </p>
          <p>
            <input
              type="submit"
              value={button.label}
              disabled={button.disabled}
            />
          </p>
        </form>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  button: {
    label: !state.progress.createMessage.inProgress
      ? "Create Post"
      : "Creating Post...",
    disabled: state.progress.createMessage.inProgress
  },
  error: state.progress.createMessage.errorMessage,
  completed: state.progress.createMessage.completed
});

const mapDispatchToProps = dispatch => ({
  onCreatePost: (message, userId, token) =>
    dispatch(createMessage(message, userId, token)),
  onPostCreated: () => dispatch(createMessageReset())
});

export default connect(mapStateToProps, mapDispatchToProps)(NewPost);
