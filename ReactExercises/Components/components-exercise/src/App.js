import "./App.css";
import { Fragment, useEffect, useState } from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Search from "./components/Search";
import UserList from "./components/UserList";
import * as userService from "./services/userService";

function App() {
  const [users, setUsers] = useState([]);
  const [clearSeach, setClearSearch] = useState(false);

  useEffect(() => {
    userService
      .getAll()
      .then((users) => {
        setUsers(users);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [clearSeach]);

  function clearSearchClick(e) {
    e.preventDefault();
    setClearSearch((current) => !current);
  }

  const onDelete = async (userId) => {
    await userService.deleteUser(userId);
    setUsers(users.filter((u) => u._id !== userId));
  };

  const filterOutSearch = (e, searchOption, filter) => {
    e.preventDefault();
    setUsers((state) => state.filter((u) => u[searchOption].includes(filter)));
  };

  const onUserCreateSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);

    const newUser = await userService.createUser(data);

    setUsers((state) => [...state, newUser]);
  };

  const onUserEditSubmit = async (e, data, userId) => {
    e.preventDefault();

    const updatedUser = await userService.editUser(data, userId);

    setUsers((state) =>
      state.map((u) => (u._id === updatedUser._id ? updatedUser : u))
    );
  };

  function sortByName(users) {
    setUsers(
      [...users].sort((a, b) => {
        if (a.firstName < b.firstName) {
          return -1;
        } else if (a.firstName > b.firstName) {
          return 1;
        } else {
          return 0;
        }
      })
    );
  }

  return (
    <Fragment>
      <Header></Header>
      <main className="main">
        <section className="card users-container">
          <Search
            filterOutSearch={filterOutSearch}
            clearSearchClick={clearSearchClick}
          ></Search>
          <UserList
            users={users}
            onDelete={onDelete}
            onUserCreateSubmit={onUserCreateSubmit}
            onUserEditSubmit={onUserEditSubmit}
            sortByName={sortByName}
          ></UserList>
        </section>
      </main>
      <Footer></Footer>
    </Fragment>
  );
}

export default App;
