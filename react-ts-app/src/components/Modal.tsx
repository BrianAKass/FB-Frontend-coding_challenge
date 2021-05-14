import React, { ReactElement, useState } from "react";
import { gql, useMutation } from "@apollo/client";
import "../styles/Modal.css";

const EDIT_PERSON = gql`
  mutation UpdatePerson($email: String!, $payload: EditPerson) {
    editPerson(email: $email, payload: $payload) {
      email
      name {
        title
        first
        last
      }
    }
  }
`;

interface Props {
  title?: string;
  first?: string;
  last?: string;

  email?: string;
  edit?: Function;
  handleOpen: Function;
}

export default function Modal({
  title,
  first,
  last,
  email,

  handleOpen,
}: Props): ReactElement {
  const initialState = {
    person_title: title,
    person_first: first,
    person_last: last,
    person_email: email,
  };

  const [updateData] = useMutation(EDIT_PERSON);
  const [newVal, setNewVal] = useState(initialState);
  const { person_title, person_first, person_last, person_email } = newVal;
  const handleChange = (field: string) => (e: any) => {
    setNewVal({ ...newVal, [field]: e.target.value });
  };

  return (
    <div className="modalContainer">
      <div className="modal">
        <h1>Edit User Data:</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            updateData({
              variables: {
                email: email,
                payload: {
                  email: person_email,
                  title: person_title,
                  first: person_first,
                  last: person_last,
                },
              },
              update: (cache, { data: updateData }) => {
                cache.modify({
                  id: cache.identify({
                    __typename: "Person",
                    email: email,
                  }),
                  fields: {
                    email: () => updateData.editPerson.email,
                    title: () => updateData.editPerson.title,
                    first: () => updateData.editPerson.first,
                    last: () => updateData.editPerson.last,
                  },
                });
              },
            });
            handleOpen();
          }}
        >
          <label>Title</label>
          <input
            className="modal-input"
            value={person_title}
            onChange={handleChange("person_title")}
          />
          <label>First Name</label>
          <input
            className="modal-input"
            value={person_first}
            onChange={handleChange("person_first")}
          />
          <label>Last Name</label>
          <input
            className="modal-input"
            value={person_last}
            onChange={handleChange("person_last")}
          />
          <label>Email</label>
          <input
            className="modal-input"
            value={person_email}
            onChange={handleChange("person_email")}
          />
          <div>
            <button
              className="modal-button modal-close"
              data-toggle="tooltip"
              data-placement="left"
              title="Close without changes"
              onClick={() => handleOpen()}
            >
              <i className="fas fa-times" /> Close
            </button>
            <button
              type="submit"
              className="modal-button modal-edit"
              data-toggle="tooltip"
              data-placement="right"
              title="Edit User Data"
            >
              <i className="fas fa-edit" /> Edit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
