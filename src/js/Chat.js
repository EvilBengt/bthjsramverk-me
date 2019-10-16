import React from "react";

class Chat extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            with: (update) => {
                return Object.assign(this.state, update);
            },
            nick: "",
            newMessage: "",
            messages: []
        };
    }

    componentDidMount() {
        
    }

    render() {
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
                        <label className="input-label chat-input-name">
                            Namn<br/>
                            <input className="input" type="text" name="nick" required
                                onBlur={ e => e.target.classList.add("edited") }
                                onChange={ e => this.setState(this.state.with({
                                    nick: e.target.value
                                })) }
                            />
                        </label>
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
                        </div>
                    </form>
                    <ul className="chat-messages">
                        { this.state.messages.map(message => (
                            <ChatMessage
                                nick={ message.nick }
                                time={ message.time }
                                body={ message.body }
                            />
                        )) }
                    </ul>
                </article>
            </main>
        );
    }

    submit() {
        console.log("Sending message")
        this.setState(this.state.with({
            newMessage: ""
        }));
    }
}

function ChatMessage(props) {
    return (
        <li className="chat-message">
            <span className="chat-message-head">
                { props.nick }
                <span className="chat-message-time">
                    { props.time }
                </span>
            </span>
            <p className="chat-message-body">
                { props.body }
            </p>
        </li>
    );
}

export default Chat;
