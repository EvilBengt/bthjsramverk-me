import React from "react";
import mugshot from "../img/mugshot.jpg";

function Byline() {
    return (
        <div className="byline">
            <img src={mugshot} className="byline-mugshot" width="95" height="96" alt="Bild på mig" />
            <p>
                <span className="byline-name">Anton Johnsson Håkansson</span>
                Bor och arbetar hemma på gården i Adelöv när jag inte sitter vid datorn.
            </p>
        </div>
    );
}

export default Byline;
