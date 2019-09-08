import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";

function Reports() {
    return (
        <Router>
            <main className="main-content">
                <Route exact path="/reports" component={Index} />
                <Route path="/reports/week" component={Weeks} />
            </main>
        </Router>
    );
}

function Index() {
    return (
        <article>
            <h1>Rapporter</h1>
            <ul>
                { content.map((_, n) => (
                    <li>
                        <Link to={ "reports/week/" + (n + 1) }>Vecka { n + 1 }</Link>
                    </li>
                )) }
            </ul>
        </article>
    );
}

function Weeks() {
    return (
        <Router>
            <Route path="/reports/week/:n" component={Week} />
        </Router>
    );
}

function Week({ match }) {
    if (match.params.n <= content.length) {
        return (
            <article>
                <h1>Week {match.params.n} </h1>
                { content[match.params.n - 1] }
            </article>
        );
    } else {
        return <h1>No content for this week yet...</h1>
    }
}

class Readme extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: undefined
        };
        const that = this;
        fetch("/README.md")
        .then(res => res.text())
        .then(text => {
            console.log(text);
            that.setState( { text: text });
        });
    }
    render() {
        return this.state.text ? (<ReactMarkdown source={this.state.text} />) : (<span>Laddar...</span>);
    }
}

const content = [
    <section>
        <a href="https://github.com/EvilBengt/bthjsramverk-me">Länk till GitHub repo</a><br /><br />
        <Readme />
    </section>
];

export default Reports;
