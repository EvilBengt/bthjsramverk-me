import React from "react";
import api from "./api";

class ReportsEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            with: (update) => {
                return Object.assign(this.state, update);
            },
            reports: [],
            empty: {
                week: "",
                text: ""
            },
            selected: {
                week: "",
                text: "",
                fetched: false
            }
        };
        this.loadFromApi();
        api.subscribeToOnTokenChanged(() => {
            this.forceUpdate();
        });
    }

    render() {
        return api.getToken() ? this.Editor() : this.NotLoggedInMsg();
    }

    NotLoggedInMsg() {
        return (
            <article>
                <h1>Administrera rapporter</h1>
                <p>Du måste vara inloggad för att komma åt denna sidan!</p>
            </article>
        );
    }

    Editor() {
        return (
            <article>
                <h1>Administrera rapporter</h1>
                <form className="form"
                    onSubmit={ e => {
                        e.preventDefault();
                        this.saveCurrent();
                    } }
                >
                    <label className="input-label">
                        Välj rapport<br/>
                        <select className="input not-validated"
                            defaultValue="0"
                            onChange={ e => this.setSelected(e.target.value) }
                        >
                            <option key="0" value="0">Skapa rapport</option>
                            { this.state.reports.map(report => (
                                <option key={report.week} value={report.week}>{ report.week }</option>
                            )) }
                        </select>
                        <button type="reset" className="button button-inline"
                            onClick={ () => this.deleteSelected() }
                            disabled={ this.state.selected.week === "" }
                        >
                            Radera
                        </button>
                        <button type="submit" className="button button-inline">
                            Spara
                        </button>
                    </label>
                    <label className="input-label">
                        Innehåll<br/>
                        <textarea
                            name="text"
                            cols="100"
                            rows="10"
                            className="input not-validated auto-width"
                            value={ this.state.selected.text }
                            onChange={ e => this.updateCurrent(e.target.value) }
                        >
                        </textarea>
                    </label>
                </form>

            </article>
        );
    }

    setSelected(week) {
        week = parseInt(week);
        if (week === 0) {
            this.setState(this.state.with({
                selected: this.state.empty
            }));
        } else {
            const selected = this.state.reports.find(report => report.week === week)

            this.setState(this.state.with({
                selected: selected
            }));
            if (!this.state.selected.fetched) {
                api.get("/reports/week/" + week)(res => {
                    if (res.ok) {
                        res.json().then(json => {
                            this.setState(this.state.with({
                                selected: {
                                    week: this.state.selected.week,
                                    text: unNullify(json.data.week.text)
                                },
                                reports: this.state.reports.map(report => {
                                    return {
                                        week: report.week,
                                        text: report.week === selected.week ? unNullify(json.data.week.text) : report.text,
                                        fetched: report.fetched || (report.week === selected.week)
                                    }
                                })
                            }));
                        })
                    }
                });
            }
        }
    }

    updateCurrent(text) {
        this.setState(this.state.with({
            selected: {
                week: this.state.selected.week,
                text: text
            }
        }));
    }

    deleteSelected() {
        const week = this.state.selected.week;

        if (week !== "") {
            api.delete("/reports", {
                week: week
            }, {
                "Content-Type": "application/x-www-form-urlencoded",
                "x-access-token": api.getToken()
            })(() => {
                this.loadFromApi();
            })
        }
    }

    saveCurrent() {
        if (this.state.selected.week === "") {
            const week = this.state.reports.reduce((acc, report) => report.week > acc ? report.week : acc, 0) + 1;
            const text = this.state.selected.text;

            api.post("/reports", {
                week: week,
                text: text
            }, {
                "Content-Type": "application/x-www-form-urlencoded",
                "x-access-token": api.getToken()
            })(res => {
                if (res.ok) {
                    this.loadFromApi();
                }
            });
        } else {
            api.put("/reports", {
                week: this.state.selected.week,
                text : this.state.selected.text
            }, {
                "Content-Type": "application/x-www-form-urlencoded",
                "x-access-token": api.getToken()
            })(res => {
                if (res.ok) {
                    this.loadFromApi();
                }
            });
        }
    }

    loadFromApi() {
        api.get("/reports/weeks")(res => {
            if (res.ok) {
                res.json().then(json => {
                    this.setState(this.state.with({
                        reports: json.data.weeks.map(report => {
                            return {
                                week: report.week,
                                text: ""
                            };
                        })
                    }));
                })
            }
        })
    }
}

function unNullify(value) {
    return value === null ? "" : value;
}

export default ReportsEditor;
