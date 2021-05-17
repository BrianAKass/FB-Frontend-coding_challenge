import { ReactElement } from "react";
import UserField from "./UserField";
import Modal from "./Modal";

export interface Props {
  data: any;
  modal?: any;
  open?: boolean;
  handleOpen: Function;
  handleModal: Function;
}

export default function Users({
  data,
  modal,
  open,
  handleOpen,
  handleModal,
}: Props): ReactElement {
  return (
    <div className="container">
      <div className="flex-box">
        {data.map((item: any) => (
          <UserField
            key={item.email}
            title={item.name.title}
            first={item.name.first}
            last={item.name.last}
            email={item.email}
            picture={item.picture.large}
            handleOpen={handleOpen}
            handleModal={handleModal}
          />
        ))}
      </div>
      {open && (
        <Modal
          title={modal.title}
          first={modal.first}
          last={modal.last}
          email={modal.email}
          handleOpen={handleOpen}
        />
      )}
    </div>
  );
}
