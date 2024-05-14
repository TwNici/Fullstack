import { To, useNavigate } from 'react-router-dom';
import './App.css';
import "./CSS/LayoutSide.css";
import { useEffect, useState } from "react";

function Layout() {
    const navigate = useNavigate();

    const handleChange = (event: { target: { value: To; }; }) => {
        navigate(event.target.value);
    };

    const mitarbeiternav = () => {
        navigate("/createmitarbeiter");
    };

    const suchenav = () => {
        navigate("/");
    };

    const erweitertesuchenav = () => {
        navigate("/erweitertesuche");
    };

    const profilanpassennav = () => {
        navigate("/profilanpassen");
    };

    const CoopGPT = () => {
        navigate("/CoopGPT");
    };

    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        const root = document.documentElement;
        if (localStorage.getItem("dm") == "true") {
            root.style.setProperty('--background-color', '#464c5c');
            root.style.setProperty('--text-color', 'white');
            root.style.setProperty( "--circle-color1", "#1d2129");
            root.style.setProperty( "--circle-color2", "#373d4a");
            document.body.classList.add('shadow-and-radius-dark');
        } else {
            root.style.setProperty('--background-color', 'white');
            root.style.setProperty('--text-color', 'black');
            root.style.setProperty( "--circle-color1", "whitesmoke");
            root.style.setProperty( "--circle-color2", "white");
            document.body.classList.remove('shadow-and-radius-dark');
        }
    }, [isDarkMode]);

    const handleCheckboxClick = () => {
        setIsDarkMode(!isDarkMode);
        localStorage.setItem("dm", String(!isDarkMode));
    };

    return (
        <div>
            <div id="leftcanvas" className="btn-layout-vertical shadow-and-radius">
                <button className="btn-layout shadow-and-radius" onClick={suchenav}>
                    Suche
                </button>
                <button className="btn-layout shadow-and-radius" onClick={erweitertesuchenav}>
                    Erweiterte Suche
                </button>
                <button className="btn-layout shadow-and-radius" onClick={mitarbeiternav}>
                    Neue Mitarbeiter eintragen
                </button>
                <button className="btn-layout shadow-and-radius" onClick={profilanpassennav}>
                    Profil anpassen
                </button>
                <button className="btn-layout shadow-and-radius" onClick={CoopGPT}>
                    Frage Coop GPT
                </button>
            </div>
            <div id="uppercanvas" className={"shadow-and-radius "}>
                <h4 onClick={suchenav}>Adressbuch</h4>
                <h6 id="Profillist">
                    <select onChange={handleChange} className="btn-layout shadow-and-radius" id={"dropdownLAYOUT"}>
                        <option value="">Profil</option>
                        <option value="/edit">Profil bearbeiten</option>
                        <option value="/Login">Logout</option>
                    </select>
                </h6>
                <label className="switch" id="darkmodeCheckbox">
                <input
                    type="checkbox"
                    checked={localStorage.getItem("dm") == "true"}
                    onChange={handleCheckboxClick}/>
                    <span className="slider round"></span>
                </label>
            </div>
            <div className={"circles "}></div>
            <div className={"circles2 "}></div>
            <div className={"circles3 "}></div>
        </div>
    );
}

export default Layout;
