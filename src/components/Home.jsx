import React from "react";
import { withRouter } from "react-router-dom";

class Home extends React.Component {
  componentDidUpdate() {
    if (!this.props.user.isLoggedIn) {
      this.props.history.push("/Login");
    }
  }
  render() {
    return (
      <h1 className="text-center">
        Welcome back {this.props.user.userFirstName}{" "}
        {this.props.user.userLastName}
      </h1>
    );
  }
}

export default withRouter(Home);
