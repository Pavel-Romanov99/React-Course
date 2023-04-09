import { Routes, Route, redirect } from "react-router-dom";
import { useEffect, useState } from "react";

import "./components/styles/style.css";

import Navigation from "./components/Navigation";
import Catalog from "./components/Catalog";
import Login from "./components/Login";
import Register from "./components/Register";
import CreateGame from "./components/CreateGame";
import Homepage from "./components/Homepage";
import Details from "./components/Details";

import * as gameService from "./services/gamesService";

function App() {
  const [games, setGames] = useState([]);

  useEffect(() => {
    gameService.getAllGames().then((result) => setGames(result));
  }, []);

  const onGameCreateSubmit = async (data) => {
    const createdGame = await gameService.createGame(data);

    setGames((current) => [...current, createdGame]);

    return redirect("/catalog");
  };

  const onGameDelete = async (id) => {
    await gameService.deleteGameById(id);

    setGames((current) => current.filter((x) => x._id !== id));

    return redirect("/catalog");
  };

  return (
    <div className="App">
      <div id="box">
        <Navigation></Navigation>

        {/* <!-- Main Content --> */}
        <main id="main-content">
          <Routes>
            <Route
              path="/"
              element={<Homepage games={games}></Homepage>}
            ></Route>
            <Route
              path="/catalog"
              element={<Catalog games={games}></Catalog>}
            ></Route>
            <Route path="/login" element={<Login></Login>}></Route>
            <Route path="/register" element={<Register></Register>}></Route>
            <Route
              path="/create"
              element={
                <CreateGame
                  onGameCreateSubmit={onGameCreateSubmit}
                ></CreateGame>
              }
            ></Route>
            <Route
              path="/catalog/:gameId"
              element={<Details onGameDelete={onGameDelete}></Details>}
            ></Route>
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;
