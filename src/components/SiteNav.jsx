import React from "react";
import NavBtn from "./NavBtn";
import { userLogOut } from "../services/userService";
import { Link, withRouter } from "react-router-dom";
import { toast } from "react-toastify";

class SiteNav extends React.Component {
  logOut = () => {
    userLogOut().then(this.onLogOutSuccess).catch(this.onLogOutError);
  };

  onLogOutSuccess = () => {
    toast.success("Logout Successfully");
    this.props.updateUserLogin(false);
    this.props.history.push("/Login");
  };
  onLogOutError = (response) => {
    toast.error("Logout Failed");
    toast.error(response.message);
  };

  render() {
    let signOpions, navLinks;
    if (this.props.isUserLoggedIn) {
      signOpions = (
        <React.Fragment>
          <button
            type="button"
            className="btn btn-warning"
            onClick={this.logOut}
          >
            Logout
          </button>
          <p className="mx-3 d-inline">{this.props.firstName}</p>
        </React.Fragment>
      );
      navLinks = (
        <React.Fragment>
          <Link to="/Friends">
            <NavBtn name="Friends" color="white" />
          </Link>
          <Link to="/Blogs">
            <NavBtn name="Blogs" color="white" />
          </Link>
          <Link to="/Tech">
            <NavBtn name="Tech" color="white" />
          </Link>
          <Link to="/Jobs">
            <NavBtn name="Jobs" color="white" />
          </Link>
          <Link to="/Events">
            <NavBtn name="Events" color="white" />
          </Link>
        </React.Fragment>
      );
    } else {
      signOpions = (
        <React.Fragment>
          <Link to="/Login">
            <button type="button" className="btn btn-outline-light me-2">
              Login
            </button>
          </Link>
          <Link to="/Register">
            <button type="button" className="btn btn-warning">
              Sign-up
            </button>
          </Link>
        </React.Fragment>
      );
    }
    return (
      <header className="p-3 bg-dark text-white">
        <div className="container">
          <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
            <a
              href="/"
              className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none"
            >
              <img
                src="https://pw.sabio.la/images/Sabio.png"
                width="30"
                height="30"
                className="d-inline-block align-top"
                alt="Sabio"
              />
            </a>

            <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
              <Link to="/">
                <NavBtn name="Home" color="white" />
              </Link>
              {navLinks}
            </ul>

            <form className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3">
              <input
                type="search"
                className="form-control form-control-dark"
                placeholder="Search..."
                aria-label="Search"
              />
            </form>

            <div className="text-end">{signOpions}</div>
          </div>
        </div>
      </header>
    );
  }
}

export default withRouter(SiteNav);
