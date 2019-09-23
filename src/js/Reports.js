import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import ReportEditor from "./ReportsEditor";

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

function Index() {
    return (
        <article>
            <h1>Rapporter</h1>
            <ul>
                { content.map((_, n) => (
                    <li key={n}>
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

class Readme extends React.Component {
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
    </section>,
    <section>
        <p>
            <a href="https://github.com/EvilBengt/bthjsramverk-me">Länk till GitHub-repo</a>
        </p>
        <p>
            Jag ville få formuläret att bli lite lagom intressant samtidigt
            som det smälter in i sidan och passar till resten av designen.
            Självklart har jag till exempel fält på var sin "rad" osv.
        </p>
        <p>
            Nästan den enda funktionen jag gillar hos Chromes datumväljare
            är att man kan klicka på den och börja skriva direkt. Man behöver
            alltså inte bläddra igenom en massa menyer och klicka hit och dit,
            om man inte vill.
        </p>
        <p>
            Eftersom man ändå skriver allt annat i formuläret med tangentbordet
            tycker jag att någon slags grafisk väljare kan känns lite klumpig.
            Tanken är att göra det så enkelt och tydligt som möjligt. Därför har
            jag endast ett enkel text-fält för datuminmatning.
        </p>
        <p>
            Självklart får dock användaren så mycket hjälp på vägen som möjligt.
            Bindestreck för att separera år-månad och månad-dag fylls i automatiskt,
            och formatet valideras vid varje inmatning, även copy-paste.
        </p>
    </section>
];

export default Reports;
