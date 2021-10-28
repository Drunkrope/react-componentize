import React from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import * as friendService from "../services/friendService";

class FriendsForm extends React.Component {
  state = {
    friendData: {
      id: "",
      title: "",
      bio: "",
      summary: "",
      headline: "",
      slug: "",
      statusId: "Active",
      primaryImage: "",
    },
  };

  componentDidMount() {
    console.log("id", this.props.match.params.id);
    console.log("params", this.props.match.params);
    // if (this.props.match.params && this.props.match.params.id) {
    //   let friendId = this.props.match.params.id;
    //   // friendService.updateFriend(friendId).then().catch();
    // }
  }

  onRegisterChange = (e) => {
    let currentTarget = e.currentTarget;
    let newValue = currentTarget.value;
    let inputName = currentTarget.name;
    this.setState(() => {
      let friendData = { ...this.state.friendData };
      friendData[inputName] = newValue;
      return { friendData };
    });
  };

  registerFriend = (e) => {
    e.preventDefault();
    const friendInfo = { ...this.state.friendData };
    friendService
      .addFriend(friendInfo)
      .then(this.onRegisterFriendSuccess)
      .catch(this.onRegisterFriendError);
  };

  onRegisterFriendSuccess = () => {
    toast.success("Friend added");
  };

  onRegisterFriendError = (response) => {
    toast.error("Friend Add Failed");
    toast.error(response.message);
  };

  update = () => {
    let id = this.props.id;
    friendService
      .updateFriend(id)
      .then(this.onUpdateSuccess)
      .catch(this.onUpdateError);
  };

  onUpdateSuccess = () => {
    toast.success("Friend Updated");
  };
  onUpdateError = (response) => {
    toast.error("Friend Update Failed");
    console.log(response.message);
  };

  render() {
    let formButton;

    if (this.props.match.params.id) {
      formButton = (
        <button
          type="submit"
          className="btn btn-primary px-5"
          onClick={this.update}
        >
          Update
        </button>
      );
    } else {
      formButton = (
        <button
          type="submit"
          className="btn btn-primary px-5"
          onClick={this.registerFriend}
        >
          Submit
        </button>
      );
    }
    return (
      <form className="border mx-auto mt-5 w-50 p-4">
        <h5 className="text-center text-secondary">Add or Edit Friends</h5>
        <div className="mb-3 row">
          <label htmlFor="title" className="col-sm-2 col-form-label">
            Title
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              onChange={this.onRegisterChange}
              value={this.state.friendData.title}
            />
          </div>
        </div>
        <div className="mb-3 row">
          <label htmlFor="bio" className="col-sm-2 col-form-label">
            Bio
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              id="bio"
              name="bio"
              onChange={this.onRegisterChange}
              value={this.state.friendData.bio}
            />
          </div>
        </div>
        <div className="mb-3 row">
          <label htmlFor="summary" className="col-sm-2 col-form-label">
            Summary
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              id="summary"
              name="summary"
              onChange={this.onRegisterChange}
              value={this.state.friendData.summary}
            />
          </div>
        </div>
        <div className="mb-3 row">
          <label htmlFor="headline" className="col-sm-2 col-form-label">
            Headline
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              id="headline"
              name="headline"
              onChange={this.onRegisterChange}
              value={this.state.friendData.headline}
            />
          </div>
        </div>
        <div className="mb-3 row">
          <label htmlFor="slug" className="col-sm-2 col-form-label">
            Slug
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              id="slug"
              name="slug"
              onChange={this.onRegisterChange}
              value={this.state.friendData.slug}
            />
          </div>
        </div>
        <div className="mb-3 row">
          <label htmlFor="primaryImage" className="col-sm-2 col-form-label">
            Image
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              id="primaryImage"
              name="primaryImage"
              onChange={this.onRegisterChange}
              value={this.state.friendData.primaryImage}
            />
          </div>
        </div>
        {formButton}
        <Link to="/Friends">
          <button className="btn btn-success mx-4 px-5">Return</button>
        </Link>
      </form>
    );
  }
}

export default FriendsForm;
