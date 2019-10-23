import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import io from "socket.io-client";
import ChatMessage from "./ChatMessage";
import SavedMessages from "./SavedMessages";

const devSocketUrl = "http://localhost:8300";
const prodSocketUrl = "https://chat.jsramverk.evilbengt.me";
let socketUrl;

if (window.location.origin.includes("localhost")) {
    socketUrl = devSocketUrl;
} else {
    socketUrl = prodSocketUrl;
}

function Chat() {
    return (
        <Router>
            <Route exact path="/chat/" component={ ChatWindow } />
            <Route path="/chat/saved" component={ SavedMessages } />
        </Router>
    )
}


class ChatWindow extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            with: (update) => {
                return Object.assign(this.state, update);
            },
            connected: false,
            active: false,
            nick: "",
            newMessage: "",
            messages: []
        };
    }

    componentDidMount() {
        this.socket = io(socketUrl);
        const that = this;

        that.socket.on("connect", function () {
            that.setState(that.state.with({
                connected: true
            }));

            that.socket.on("messageFromServer", function (message) {
                that.addMessage(message);
            });

            that.socket.on("newClient", function (message) {
                that.addMessage(message + " anslöt till konversationen.");
            })
        });
    }

    render() {
        return this.state.connected && this.state.active ? this.Main() : this.Welcome();
    }

    Welcome() {
        return (
            <main className="main-content">
                <article>
                    <h1>Chatt</h1>
                    <form className="form"
                        onSubmit={e => {
                            e.preventDefault();
                            this.setState(this.state.with({
                                active: true
                            }));
                            this.socket.emit("clientConnected", this.state.nick);
                        }}
                    >
                        <label className="input-label chat-input-name">
                            Namn<br/>
                            <input className="input" type="text" name="nick" required
                                onBlur={ e => e.target.classList.add("edited") }
                                onChange={ e => this.setState(this.state.with({
                                    nick: e.target.value
                                })) }
                            />
                        </label>
                        <button type="submit" className="button button-submit">
                            Börja chatta
                        </button>
                    </form>
                </article>
            </main>
        )
    }

    Main() {
        return (
            <main className="main-content">
                <article className="chat">
                    <h1 className="chat-title">Chatt</h1>
                    <form className="form chat-form"
                        onSubmit={e => {
                            e.preventDefault();
                            this.submit()}
                        }
                    >
                        <div className="chat-input-footer">
                            <label className="input-label chat-input-message">
                                Meddelande<br/>
                                <input className="input" type="text" name="message" required
                                    value={ this.state.newMessage }
                                    onChange={ e => this.setState(this.state.with({
                                        newMessage: e.target.value
                                    })) }
                                />
                            </label>
                            <button type="submit" className="button button-submit chat-submit">
                                Skicka
                            </button>
                            <p>
                                Klicka på ett meddelande för att spara på servern.
                            </p>
                        </div>
                    </form>
                    <ul className="chat-messages">
                        { this.state.messages.map((message, index) => {
                            if (typeof(message) === "object") {
                                return (
                                    <ChatMessage key={ index }
                                        nick={ message.nick }
                                        time={ message.time }
                                        body={ message.body }
                                        isMe={ message.nick === this.state.nick }
                                        saveable
                                        onClick={ e => {
                                            e.preventDefault();
                                            this.saveMessage(message);
                                        } }
                                    />
                                );
                            } else {
                                return (
                                    <Notice key={ index }
                                        notice={ message }
                                    />
                                );
                            }
                        }) }
                    </ul>
                </article>
            </main>
        );
    }

    submit() {
        const time = (new Date()).toLocaleString();

        this.socket.emit("messageFromClient", {
            nick: this.state.nick,
            time: time,
            body: this.state.newMessage
        });
        this.setState(this.state.with({
            newMessage: ""
        }));
    }

    addMessage(message) {
        let newMessages = this.state.messages;
        newMessages.push(message);

        this.setState(this.state.with({
            messages: newMessages
        }));
    }

    saveMessage(message) {
        this.socket.emit("saveMessage", message);
    }
}

function Notice(props) {
    return (
        <li className="chat-message chat-notice">
            { props.notice }
        </li>
    );
}

export default Chat;
