import React from "react";
import { Link, withRouter } from "react-router-dom";
import { toast } from "react-toastify";
import { userLogin } from "../services/userService";

class Login extends React.Component {
  state = {
    loginData: {
      email: "jnhgvbnjbh@gmail.com",
      password: "yhgtFG5674#$",
      tenantId: "56783462",
    },
  };

  onLogInChange = (e) => {
    let currentTarget = e.currentTarget;
    let newValue = currentTarget.value;
    let inputName = currentTarget.name;
    this.setState(() => {
      let loginData = { ...this.state.loginData };
      loginData[inputName] = newValue;
      return { loginData };
    });
  };

  logIn = (e) => {
    e.preventDefault();
    const loginInfo = { ...this.state.loginData };
    userLogin(loginInfo).then(this.onLogInSuccess).catch(this.onLogInError);
  };

  onLogInSuccess = () => {
    toast.success("Login Successfully");
    this.props.updateUserLogin(true);
    this.props.history.push("/");
  };
  onLogInError = (response) => {
    toast.error("Login Failed");
    toast.error(response.message);
  };
  render() {
    return (
      <form className="border mx-auto mt-5 w-25 p-4 ">
        <h5 className="text-center text-secondary">Sign In</h5>
        <input
          type="email"
          className="form-control my-3"
          id="email"
          name="email"
          placeholder="Email"
          onChange={this.onLogInChange}
          value={this.state.loginData.email}
        />
        <input
          type="password"
          className="form-control my-3"
          id="password"
          name="password"
          placeholder="Password"
          onChange={this.onLogInChange}
          value={this.state.loginData.password}
        />
        <input
          type="text"
          className="form-control my-3"
          id="tenantId"
          name="tenantId"
          placeholder="tenant Id"
          onChange={this.onLogInChange}
          value={this.state.loginData.tenantId}
        />
        <div className="form-check d-flex justify-content-between p-0">
          <div>
            <p className="text-primary">I forgot my password</p>
            <Link to="/Register" className="text-decoration-none">
              Register a new membership
            </Link>
          </div>
          <button
            type="submit"
            className="btn btn-primary my-3 px-5"
            onClick={this.logIn}
          >
            Sign In
          </button>
        </div>
      </form>
    );
  }
}

export default withRouter(Login);
