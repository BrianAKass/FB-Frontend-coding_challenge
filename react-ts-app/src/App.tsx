import React, { useState, useEffect } from "react";
import Users from "./components/Users";
import Navbar from "./components/Navbar";
import "./App.css";
import { gql, useQuery } from "@apollo/client";
export const GET_USERS = gql`
  query Person {
    people {
      email
      name {
        title
        first
        last
      }
      picture {
        large
        medium
        thumbnail
      }
    }
  }
`;

function App() {
  const { loading, error, data } = useQuery(GET_USERS);
  const [state, setState] = useState({
    data: data,
    open: false,
    search: "",
    modal: {
      title: "",
      first: "",
      last: "",
      email: "",
    },
  });
  const handleOpen = () => {
    setState((prev) => ({
      ...prev,
      open: !prev.open,
    }));
  };
  const handleModal = (
    title: string,
    first: string,
    last: string,
    email: string
  ) => {
    setState((prev) => ({
      ...prev,
      modal: {
        title: title,
        first: first,
        last: last,
        email: email,
      },
    }));
  };

  const handleSearch = (field: string) => (e: any) => {
    // setSearch(e.target.value);
    setState((prev) => ({ ...prev, search: e.target.value }));
  };

  const clearSearch = () => {
    setState((prev) => ({ ...prev, search: "" }));
  };

  useEffect(() => {
    return setState((prev) => ({ ...prev, data: data }));
  }, [data]);

  const filterPeople = () => {
    return data.people.filter(
      (item: any) =>
        item.name.title.toLowerCase() === state.search.toLowerCase() ||
        item.name.first.toLowerCase().match(state.search.toLowerCase()) ||
        item.name.last.toLowerCase().match(state.search.toLowerCase()) ||
        item.email.toLowerCase().match(state.search.toLowerCase())
    );
  };
  if (loading) return <h1>Loading</h1>;
  if (error) return <h1>{error}</h1>;

  return (
    <div className="App">
      <Navbar
        search={state.search}
        handleSearch={handleSearch}
        clearSearch={clearSearch}
      />
      <Users
        // data={state.data.people}
        data={filterPeople}
        handleOpen={handleOpen}
        handleModal={handleModal}
        open={state.open}
        modal={state.modal}
      />
    </div>
  );
}

export default App;
