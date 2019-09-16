import React from "react";
import DatePicker from "./DatePicker";

function RegForm() {
    return (
        <main className="main-content">
            <article>
                <h1>Registrera användare</h1>
                <form className="form">
                    <label className="input-label">
                        Namn<br/>
                        <input className="input" type="text" name="name" required
                            onBlur={ e => e.target.classList.add("edited") }
                        />
                    </label>
                    <label className="input-label">
                        Epost<br/>
                        <input className="input" type="email" name="email" required
                            onBlur={ e => e.target.classList.add("edited") }
                        />
                    </label>
                    <label className="input-label">
                        Lösenord<br/>
                        <input className="input" type="password" name="password" required
                            onBlur={ e => e.target.classList.add("edited") }
                        />
                    </label>
                    <label className="input-label">
                        Födelsedatum<br/>
                        <DatePicker className="input" required name="birthdate"
                            onBlur={ e => e.target.classList.add("edited") }
                        />
                    </label>
                    <div className="form-footer">
                        <button type="submit" className="button button-submit">
                            Gå vidare
                        </button>
                    </div>
                </form>
            </article>
        </main>
    );
}

export default RegForm;
