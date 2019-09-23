import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import ReportEditor from "./ReportsEditor";
import api from "./api";

function Reports() {
    return (
        <Router>
            <main className="main-content">
                <Route exact path="/reports" component={Index} />
                <Route path="/reports/week" component={Weeks} />
                <Route path="/reports/edit" component={ReportEditor} />
            </main>
        </Router>
    );
}

class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            content: []
        };
        api.get("/reports/weeks")(res => {
            if (res.ok) {
                res.json().then(json => {
                    this.setState({
                        content: json.data.weeks
                    });
                });
            }
        });
    }

    render() {
        return (
            <article>
                <h1>Rapporter</h1>
                <ul>
                    { this.state.content.map(week => (
                        <li key={week.week}>
                            <Link to={ "reports/week/" + week.week }>Vecka { week.week }</Link>
                        </li>
                    )) }
                </ul>
            </article>
        );
    }
}

function Weeks() {
    return (
        <Router>
            <Route path="/reports/week/:week" component={Week} />
        </Router>
    );
}

class Week extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            content: undefined
        };
        api.get("/reports/week/" + props.match.params.week)(res => {
            if (res.ok) {
                res.json().then(json => {
                    this.setState({
                        content: <ReactMarkdown source={ json.data.week.text } />
                    })
                });
            }
        });
    }

    render() {
        if (this.state.content) {
            return (
                <article>
                    <h1>Vecka { 1 } </h1>
                    { this.state.content }
                </article>
            );
        } else {
            return (
                <article>
                </article>
            )
        }
    }
}

export default Reports;
