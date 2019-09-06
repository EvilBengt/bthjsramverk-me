import React from "react";
import mugshot from "../img/mugshot.jpg"
import Byline from "./Byline";

function Home() {
    return (
        <main className="main-content">
            <article>
                <h1>Vem är jag?</h1>
                <figure className="figure-float">
                    <img className="image" src={mugshot} alt="Bild på mig" width="95" height="96" />
                    <figcaption>Brahälla, 2016</figcaption>
                </figure>
                <p>
                    Anton Johnsson Håkansson. Bor och arbetar hemma på gården i Adelöv när jag inte
                    sitter vid datorn. Läste Teknik på gymnasiet och gick sedan vidare till
                    Systemutvecklare .NET på yrkeshögskola. När jag efter drygt en termin inte kände
                    mig nöjd med upplägget och innehållet i kurserna bestämde jag mig för att byta.
                    Jag hittade då Webbprogrammering på BTH och kände att den verkade mycket intressant.
                    Tidigare har jag aldrig tänkt att webb kan vara roligt utan har mer velat fokusera på
                    att bygga applikationer i .NET, men när webb började locka mer och mer bestämde jag
                    mig för att söka till BTH.
                </p>
                <p>
                    Nu för tiden sitter jag och funderar och planerar på alla mina projekt. Styrning till
                    min hemmabyggda gräsklippar-dumper, steglös växling till gräsklipparen, advancerad
                    väckarklocka av en arduino. Under sommaren har jag dock inte kommit längre än att jag
                    köpt delar till ovan nämnda styrning och i vintras någon gång köpte jag en massa grejer
                    till väckarklockan. Det hade vart gött om projekten kunde hjälpa till lite och bygga sig
                    själva...
                </p>
                <p>
                    Vad gäller programmering har jag mitt databas-system med php-api och mithril-frontend
                    för dokumentering inom lantbruk på gång sedan februari/mars. Jag började med egen
                    template-engine i php men när vi lärde oss mithril i webapp-kursen var det nästan
                    självklart att jag skulle använda det istället.
                </p>
                <p>
                    En liten del av den tid jag inte jobbat på gården har jag lagt på att lära mig F#. C#
                    var tidigare mitt absoluta favorit-språk, och F# har typ allt jag gillar från C# och
                    lite till. Självklart är det väldigt annorlunda, functional istället för objectoriented
                    osv. Jag försöker hela tiden hitta något att använda det till men har inte kommit så
                    långt på det ännu.
                </p>
                <p>
                    Jag har även börjat intressera mig för Forth, ett gammalt stack-based
                    programmeringsspråk/miljö/compiler/interactive. Väldigt intressant, dock ännu svårare
                    att hitta något användningsområde. Webb är nog inte att tänka på vad gäller Forth,
                    men F# kanske?
                </p>

            </article>

            <Byline />
        </main>
    );
}

export default Home;
