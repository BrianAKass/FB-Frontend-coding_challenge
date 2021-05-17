import { ReactElement } from "react";
import "../styles/Navbar.css";

interface Props {
  search: string;
  handleSearch: Function;
  clearSearch: Function;
}

export default function Navbar({
  search,
  handleSearch,
  clearSearch,
}: Props): ReactElement {
  //   const handleSearch = (field: string) => (e: any) => {
  //     // setSearch(e.target.value);
  //   };

  return (
    <div className="navbar">
      <div>
        <span className="navbar-header">Creative Title</span>
        <input
          className="navbar-search"
          type="text"
          placeholder="Search.."
          name="search"
          value={search}
          onChange={handleSearch("search")}
        />
        <button onClick={() => clearSearch()} className="navbar-search">
          <i className="fa fa-times" />
        </button>
      </div>
    </div>
  );
}
