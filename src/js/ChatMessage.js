import React from "react";

function ChatMessage(props) {
    return (
        <li className={
            "chat-message"
            + (props.isMe ? " is-me" : "")
            + (props.saveable ? " saveable" : "") }
            onClick={ props.onClick }
        >
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

export default ChatMessage;
