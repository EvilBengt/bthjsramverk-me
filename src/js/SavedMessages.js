import React from "react";
import io from "socket.io-client";
import ChatMessage from "./ChatMessage";

const devSocketUrl = "http://localhost:8300";
const prodSocketUrl = "https://chat.jsramverk.evilbengt.me";
let socketUrl;

if (window.location.origin.includes("localhost")) {
    socketUrl = devSocketUrl;
} else {
    socketUrl = prodSocketUrl;
}


class SavedMessages extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            messages: []
        };
    }

    componentDidMount() {
        this.socket = io(socketUrl);
        const that = this;

        that.socket.on("connect", function () {
            that.socket.emit("getSavedMessages");
        });

        that.socket.on("savedMessages", function (messages) {
            that.setState({
                messages: messages
            });
        });
    }

    render() {
        return (
            <main className="main-content">
                <article>
                    <h1>Sparade meddelanden</h1>
                    <ul className="chat-messages">
                        { this.state.messages.map((message, index) => (
                            <ChatMessage key={ index }
                                nick={ message.nick }
                                time={ message.time }
                                body={ message.body }
                            />
                        )) }
                    </ul>
                </article>
            </main>
        )
    }
}

export default SavedMessages;
