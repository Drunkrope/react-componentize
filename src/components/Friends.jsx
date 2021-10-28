import React from "react";
import { Link } from "react-router-dom";
import Pagination from "rc-pagination";
import { friendsList } from "../services/friendService";
import FriendsCard from "./FriendsCard";

class Friends extends React.Component {
  state = {
    pageInfo: {
      pageIndex: 1,
      pageSize: 3,
    },
    list: [],
  };

  list = () => {
    let info = { ...this.state.pageInfo };
    friendsList(info).then(this.onListSuccess).catch(this.onListError);
  };

  onListSuccess = (response) => {
    this.setState(() => {
      let list = { ...this.state.list };
      list = response.data.item.pagedItems;
      return { list };
    });
  };

  onListError = (response) => {
    console.log(response.message);
  };

  onChange = (page) => {
    this.setState(() => {
      let pageInfo = { ...this.state.pageinfo };
      pageInfo.pageIndex = page;
      return { pageInfo };
    });
    this.list();
  };

  onEdit = (id) => {
    this.props.history.push(`/FriendsForm/${id}`);
  };

  mapfriends = (friend) => {
    return (
      <FriendsCard
        key={friend.id}
        friendId={friend.id}
        onDelete={this.onDelete}
        onEdit={this.onEdit}
        friend={friend}
      />
    );
  };

  componentDidMount() {
    this.list();
  }

  render() {
    return (
      <React.Fragment>
        <div className="d-flex justify-content-between mx-3 my-3">
          <div className="d-flex">
            <h3 className="mx-3">Friends</h3>
            <Link to="/FriendsForm">
              <button className="btn btn-success px-3">+ Friend</button>
            </Link>
          </div>
          <form className="d-flex">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search Friends"
              aria-label="Search"
            />
            <button className="btn btn-secondary" type="submit">
              Search
            </button>
          </form>
        </div>
        <div className="card-group w-75 m-auto">
          {this.state.list.map(this.mapfriends)}
        </div>
        <Pagination
          className="my-5 d-flex justify-content-center"
          onChange={this.onChange}
          current={this.state.pageInfo.pageIndex}
          total={50}
        />
      </React.Fragment>
    );
  }
}

export default Friends;
