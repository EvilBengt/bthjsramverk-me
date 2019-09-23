import React from "react";
import api from "./api";

class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            with: (update) => {
                return Object.assign(this.state, update);
            },
            active: false,
            login: "",
            password: ""
        };
    }

    render() {
        return this.state.active ? this.Expanded() : this.Collapsed();
    }

    Collapsed() {
        if (api.token) {
            return (
                <button type="button" className="login"
                    onClick={ () => api.token = undefined }
                >
                    Logga ut
                </button>
            );
        } else {
            return (
                <button type="button" className="login"
                    onClick={ () => this.setState(this.state.with({
                        active: true
                    })) }
                >
                    Logga in
                </button>
            );
        }
    }

    Expanded() {
        return (
            <div className="login login-expanded">
                <form className="form"
                    onSubmit={e => {
                        e.preventDefault();
                        this.submit();
                    }}
                >
                    <label className="input-label">
                        Namn/Epost<br/>
                        <input type="text" name="login" className="input" required
                            onBlur={ e => e.target.classList.add("edited") }
                            onChange={ e => this.setState(this.state.with({
                                login: e.target.value
                            }))}
                        />
                    </label>
                    <label className="input-label">
                            Lösenord<br/>
                        <input type="password" name="password" className="input" required
                            onBlur={ e => e.target.classList.add("edited") }
                            onChange={ e=> this.setState(this.state.with({
                                password: e.target.value
                            })) }
                        />
                    </label>
                    <div className="form-footer">
                        <button type="reset" className="button button-clear"
                            onClick={ () => this.setState(this.state.with({
                                active: false
                            })) }
                        >
                            Stäng
                        </button>
                        <button type="submit" className="button button-submit">
                            Logga in
                        </button>
                    </div>
                </form>
            </div>
        );
    }

    submit() {
        api.post("/login", {
            login: this.state.login,
            password: this.state.password
        }, {
            "Content-Type": "application/x-www-form-urlencoded"
        })(res => {
            if (res.ok) {
                res.json().then(json => {
                    api.token = json.data.token;
                    this.setState(this.state.with({
                        active: false
                    }));
                })
            } else {
                api.token = undefined;
            }
        })
    }
}

export default Login;
