import { connect } from "react-redux";

const Unauthenticated = ({ render, children }) => {
  return render && children;
};

const mapStateToProps = state => ({
  render: state.user === null
});

export default connect(mapStateToProps)(Unauthenticated);
