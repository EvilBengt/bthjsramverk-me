import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import logo from "../img/logo9090.png"
import Home from "./Home";
import Reports from "./Reports"

function App() {
  return (
      <Router>
              <Aside />

              <Route exact path="/" component={Home} />
              <Route path="/reports/" component={Reports} />

              <Footer />
      </Router>
  );
}

function Aside() {
    return (
        <aside className="main-aside">
            <header className="aside-header">
                <img src={logo} alt="Logga" className="header-img"/>
                <span className="header-title">Anton</span>
                <div className="header-sub">
                    <span className="header-sub-title">Johnsson Håkansson</span>
                    <span className="header-slogan">jsramverk</span>
                </div>
            </header>
            <nav className="header-nav nav">
                <Link to="/">Hem</Link>
                <Link to="/reports">Rapporter</Link>
            </nav>
        </aside>
    );
}

function Footer() {
    return (
        <footer className="main-footer">
            <span className="footer-name">
                Anton Johnsson Håkansson
            </span>
            <span className="footer-row">
                Webbprogrammering 120hp - Blekinge Tekniska Högskola
            </span>
            <span className="footer-row">
                2019
            </span>
        </footer>
    );
}

export default App;
