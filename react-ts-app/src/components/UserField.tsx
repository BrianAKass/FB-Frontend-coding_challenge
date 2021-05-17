import React, { ReactElement, useState } from "react";
import { setTimeout } from "timers";

import "../styles/UserField.css";

export interface Props {
  title?: string;
  first?: string;
  last?: string;
  picture?: string;
  email?: string;
  handleOpen: Function;
  handleModal: Function;
}

export default function UserField({
  title,
  first,
  last,
  picture,
  email,
  handleOpen,
  handleModal,
}: Props): ReactElement {
  const [clicked, setClicked] = useState(false);
  const handleClick = (title: any, first: any, last: any, email: any) => {
    handleModal(title, first, last, email);
    handleOpen();
  };
  const handleCopy = () => {
    navigator.clipboard.writeText(email!);
    setClicked(true);
    setTimeout(() => {
      setClicked(false);
    }, 500);
  };
  return (
    <div className="twoToneCard">
      <div className="top" />
      <img src={picture} alt="profile-pic" className="profile" />
      <h2>
        <span>{title}</span>
        {first} {last}
      </h2>
      <div className="bottom">
        <span
          className={!clicked ? "email" : "copied"}
          data-toggle="tooltip"
          data-placement="left"
          title={`Copy Email: ${email} to clipboard`}
          onClick={() => {
            handleCopy();
          }}
        >
          <i className="fas fa-envelope" /> {!clicked ? "Email" : "Copied!"}
        </span>
        <span
          className="edit"
          data-toggle="tooltip"
          data-placement="right"
          title="Edit User Data"
          onClick={() => handleClick(title, first, last, email)}
        >
          <i className="fas fa-edit" /> Edit
        </span>
      </div>
    </div>
  );
}
