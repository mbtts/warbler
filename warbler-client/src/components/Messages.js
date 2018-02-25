import React, { Component } from "react";

import { connect } from "react-redux";
import { listMessages } from "../actions/message";
import moment from "moment";

const FULL_DATE_FORMAT = "dddd Do MMMM YYYY (HH:mm:ss)";

class Messages extends Component {
  componentDidMount() {
    this.props.dispatch(listMessages());
  }

  render() {
    const { message } = this.props;

    return (
      <React.Fragment>
        <h2>Messages</h2>
        {message &&
          message.map(m => (
            <blockquote key={m._id}>
              <p>{m.text}</p>
              <footer>
                {m.userId.username}
                <em title={moment(m.createdAt).format(FULL_DATE_FORMAT)}>
                  {moment(m.createdAt).fromNow()}
                </em>
              </footer>
            </blockquote>
          ))}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  message: state.message
});

export default connect(mapStateToProps)(Messages);
