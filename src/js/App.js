import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import logo from "../img/logo9090.png"
import Home from "./Home";
import Reports from "./Reports";
import RegForm from "./RegForm";
import Login from "./Login";
import Chat from "./Chat";

function App() {
    return (
        <Router>
            <Aside />
            <Login />

            <Route exact path="/" component={Home} />
            <Route path="/reports/" component={Reports} />
            <Route path="/register/" component={RegForm} />
            <Route path="/chat/" component={Chat} />

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
                <div className="sub-nav">
                    <Link to="/reports/edit">Administrera</Link>
                </div>
                <Link to="/register">Registrera</Link>
                <Link to="/chat">Chatt</Link>
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
