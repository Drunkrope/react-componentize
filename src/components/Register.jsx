import React from "react";
import { Link, withRouter } from "react-router-dom";
import { toast } from "react-toastify";
import { userRegister } from "../services/userService";

class Register extends React.Component {
  state = {
    registerFormData: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      passwordConfirm: "",
      avatarUrl: "",
      terms: false,
      tenantId: "",
    },
  };

  onRegisterChange = (e) => {
    let currentTarget = e.currentTarget;
    let newValue =
      currentTarget.type === "checkbox"
        ? currentTarget.checked
        : currentTarget.value;
    let inputName = currentTarget.name;
    this.setState(() => {
      let registerFormData = { ...this.state.registerFormData };
      registerFormData[inputName] = newValue;
      return { registerFormData };
    });
  };

  sendInfo = (e) => {
    e.preventDefault();
    const registerInfo = { ...this.state.registerFormData };
    if (registerInfo.terms) {
      userRegister(registerInfo)
        .then(this.onRegisterSuccess)
        .catch(this.onRegisterError);
    } else {
      toast.error("Please Accept Terms");
    }
  };

  onRegisterSuccess = () => {
    toast.success("You have Registered Successfully");
    this.props.history.push("/Login");
  };
  onRegisterError = (response) => {
    toast.error("Registration Failed");
    toast.error(response.message);
  };

  render() {
    return (
      <form className="border mx-auto mt-5 w-50 p-4">
        <h5 className="text-center text-secondary">
          Register a new membership
        </h5>
        <input
          type="text"
          className="form-control my-3"
          id="firstName"
          name="firstName"
          placeholder="First Name"
          onChange={this.onRegisterChange}
          value={this.state.registerFormData.firstName}
        />
        <input
          type="text"
          className="form-control my-3"
          id="lastName"
          name="lastName"
          placeholder="Last Name"
          onChange={this.onRegisterChange}
          value={this.state.registerFormData.lastName}
        />
        <input
          type="email"
          className="form-control my-3"
          id="email"
          name="email"
          placeholder="Email"
          onChange={this.onRegisterChange}
          value={this.state.registerFormData.email}
        />
        <input
          type="password"
          className="form-control my-3"
          id="password"
          name="password"
          placeholder="Password"
          onChange={this.onRegisterChange}
          value={this.state.registerFormData.password}
        />
        <input
          type="password"
          className="form-control my-3"
          id="passwordConfirm"
          name="passwordConfirm"
          placeholder="Retype password"
          onChange={this.onRegisterChange}
          value={this.state.registerFormData.passwordConfirm}
        />
        <input
          type="text"
          className="form-control my-3"
          id="avatarUrl"
          name="avatarUrl"
          placeholder="Avatar Url"
          onChange={this.onRegisterChange}
          value={this.state.registerFormData.avatarUrl}
        />
        <input
          type="text"
          className="form-control my-3"
          id="tenantId"
          name="tenantId"
          placeholder="tenant Id"
          onChange={this.onRegisterChange}
          value={this.state.registerFormData.tenantId}
        />
        <div className="form-check d-flex justify-content-between">
          <div>
            <input
              type="checkbox"
              className="form-check-input"
              id="terms"
              name="terms"
              checked={this.state.registerFormData.terms}
              value="false"
              onChange={this.onRegisterChange}
            />
            <label className="form-check-label fw-bold" htmlFor="terms">
              I agree to the <span className="text-primary">terms</span>
            </label>
          </div>

          <button
            type="submit"
            className="btn btn-primary px-5"
            onClick={this.sendInfo}
          >
            Register
          </button>
        </div>
        <Link to="/Login" className="text-decoration-none">
          Already have an account?
        </Link>
      </form>
    );
  }
}

export default withRouter(Register);
