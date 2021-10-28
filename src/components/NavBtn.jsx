import React from "react";

class NavBtn extends React.Component {
  render() {
    return (
      <li>
        <button
          href="#"
          className={`nav-link px-2 text-${this.props.color} link-button`}
        >
          {this.props.name}
        </button>
      </li>
    );
  }
}

export default NavBtn;
