import { connect } from "react-redux";
import { logout } from "../actions/user";

const Logout = ({ logout }) => {
  logout();
  return null;
};

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout())
});

export default connect(null, mapDispatchToProps)(Logout);
