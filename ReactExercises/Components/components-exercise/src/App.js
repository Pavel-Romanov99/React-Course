import "./App.css";
import { Fragment, useEffect, useState } from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Search from "./components/Search";
import UserList from "./components/UserList";
import * as userService from "./services/userService";

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    userService
      .getAll()
      .then((users) => {
        setUsers(users);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const onDelete = async (userId) => {
    await userService.deleteUser(userId);
    setUsers(users.filter((u) => u._id !== userId));
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

  return (
    <Fragment>
      <Header></Header>
      <main className="main">
        <section className="card users-container">
          <Search></Search>
          <UserList
            users={users}
            onDelete={onDelete}
            onUserCreateSubmit={onUserCreateSubmit}
            onUserEditSubmit={onUserEditSubmit}
          ></UserList>
        </section>
      </main>
      <Footer></Footer>
    </Fragment>
  );
}

export default App;
