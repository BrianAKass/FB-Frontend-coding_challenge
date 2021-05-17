import { ReactElement } from "react";
import "../styles/Navbar.css";

export interface Props {
  handleSearch: Function;
  clearSearch: Function;
}

export default function Navbar({
  handleSearch,
  clearSearch,
}: Props): ReactElement {
  return (
    <div className="navbar">
      <div>
        <span className="navbar-header">Creative Title</span>
        <input
          className="navbar-search"
          type="text"
          placeholder="Search.."
          name="search"
          onChange={handleSearch()}
        />
        <button onClick={() => clearSearch()} className="navbar-search">
          <i className="fa fa-times" />
        </button>
      </div>
    </div>
  );
}
