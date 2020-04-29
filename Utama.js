import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
// Load Navbar
import Navbar from "./component/Navbar";
// Load halaman
import Login from "./page/Login";
import Register from "./page/Register";
import Users from "./page/Users";
import Profil from "./page/Profil";
import Lapangan from "./client/Lapangan";
import DataLapangan from "./page/DataLapangan";
import Sewa from "./client/Sewa";
import DataSewa from "./page/DataSewa";

class Utama extends Component {
  render = () => {
    return (
      <Switch>
        {/* Load component tiap halaman */}
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />

        <Route path="/users">
          <Navbar />
          <Users />
        </Route>

        <Route path="/profil">
          <Navbar />
          <Profil />
        </Route>

        <Route path="/lapangan">
          <Navbar />
          <Lapangan />
        </Route>

        <Route path="/datalapangan">
          <Navbar />
          <DataLapangan />
        </Route>

        <Route path="/sewa">
          <Navbar />
          <Sewa />
        </Route>

        <Route path="/datasewa">
          <Navbar />
          <DataSewa />
        </Route>

      </Switch>
    );
  }
}

export default Utama;
