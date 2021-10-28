import React from "react";

import { deleteFriend } from "../services/friendService";

const FriendsCard = (props) => {
  let id = props.friendId;

  const onDelete = (id) => {
    deleteFriend(id).then(onDeleteSuccess).catch(onDeleteError);
  };
  const onDeleteSuccess = (response) => {
    console.log(response);
  };
  const onDeleteError = (response) => {
    console.log(response.message);
  };

  return (
    <div className="card p-4 mx-4 border">
      <img
        src={props.friend.primaryImage.imageUrl}
        className="card-img-top"
        alt={`Avatar of ${props.friend.title}`}
      />
      <div className="card-body">
        <h5 className="card-title">{props.friend.title}</h5>
        <p className="card-text">{props.friend.bio}</p>
      </div>
      <div className="d-flex justify-content-around w-50 m-auto">
        <button className="btn btn-danger" onClick={() => onDelete(id)}>
          Delete
        </button>
        <button
          className="btn btn-info text-white"
          onClick={() => props.onEdit(id)}
        >
          Edit
        </button>
      </div>
    </div>
  );
};

export default FriendsCard;
