import React, { Component } from 'react';
import { Link } from "react-router-dom";
class Navbar extends Component {
  Logout = () => {
    localStorage.removeItem("Token");
    localStorage.removeItem("role");
    localStorage.removeItem("sewa");
    localStorage.removeItem("id");
    window.location = "/login"
  }

  navGuest = () => {
    return (
      <div className="navbar navbar-expand-lg bg-dark navbar-dark">
        <div className="navbar-collapse collapse" id="menu">
          <ul className="navbar-nav">
            <li className="Navbar-item">
              <Link className="nav-link" to="/client">Client</Link>
            </li>
            <li className="Navbar-item">
              <Link className="nav-link" to="/login">Login</Link>
            </li>
          </ul>
        </div>
      </div>
    )
  }

  navAdmin = () => {
    return (
      <div className="navbar navbar-expand-lg bg-dark navbar-dark">
        <div className="navbar-collapse collapse" id="menu">
          <ul className="navbar-nav">
            {/* list menu */}
            <li className="navbar-item">
              <Link className="nav-link" to="/datalapangan">Lapangan</Link>
            </li>
            <li className="navbar-item">
              <Link className="nav-link" to="/users">Data Member</Link>
            </li>
            <li className="navbar-item">
              <Link className="nav-link" to="/datasewa">Data Sewa</Link>
            </li>
            <li className="navbar-item">
              <Link className="nav-link" onClick={this.Logout}>Logout</Link>
            </li>
          </ul>
        </div>
      </div>

    )
  }

  navUser = () => {
    return (
      <div className="navbar-collapse collapse" id="menu">
        <div className="navbar navbar-expand-lg bg-dark navbar-dark">
          <ul className="navbar-nav">
            {/* list menu */}
            <li className="Navbar-item">
              <Link className="nav-link" to="/lapangan">Sewa</Link>
            </li>
            <li className="navbar-item">
              <Link className="nav-link" to="/profil">Profil</Link>
            </li>
            <li className="navbar-item">
              <Link className="nav-link" onClick={this.Logout}>Logout</Link>
            </li>
          </ul>
        </div>
      </div>


    )
  }
  render() {
    let auth = localStorage.getItem("Token")
    let role = localStorage.getItem("role")
    return (
      <div className="navbar navbar-expand-lg bg-dark navbar-dark">
        <button type="button" className="navbar-toggler navbar-toggler-right"
          data-toggle="collapse" data-target="#menu">
          <span className="navbar navbar-toggler-icon"></span>
        </button>
        {!auth ? this.navGuest() : role === "admin" ? this.navAdmin() : this.navUser()}
      </div>
    );
  }
}
export default Navbar;