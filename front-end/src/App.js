import React from "react";
import "./App.css";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";

import HomePage from './pages/home/home.page';
import LoginPage from './pages/login/login.page';
import BandListPage from './pages/band-list/band-list.page';
import BandDetailPage from './pages/band-detail/band-detail.page';
import BandEditPage from './pages/band-edit/band-edit.page';
 
class App extends React.Component {
  render() {
    return (
        <BrowserRouter>
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <span>&nbsp;</span>
            <a className="navbar-brand" href="/">Exemplo App</a>
            <button className="navbar-toggler" 
              type="button" 
              data-toggle="collapse" 
              data-target="#navbarMenu" 
              aria-controls="navbarMenu">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarMenu">
              <div className="navbar-nav">
                <a href="/" className="nav-item nav-link">Home</a>
                <a href="/band-list" className="nav-item nav-link">Bandas</a>
              </div>
            </div>
          </nav>

          <Routes location={this.props.location}>
            <Route path="/" exact={true} Component={HomePage}/>
            <Route path="/login" Component={LoginPage}/>
            <Route path="/band-list" Component={BandListPage}/>
            <Route path="/band-detail/:id" Component={BandDetailPage}/>
            <Route path="/band-add" Component={BandEditPage}/>
            <Route path="/band-edit/:id" Component={BandEditPage}/>
          </Routes>

        </BrowserRouter>
    );
  }
}

export default App;