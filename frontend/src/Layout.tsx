import { To, useNavigate } from 'react-router-dom';
import './App.css';
import "./CSS/LayoutSide.css";
import {useContext, useEffect, useState} from "react";
import {roleType, UserContext, UserInfo} from "./App.tsx";
import axios from "axios";


function Layout() {

    const {setUserId} = useContext(UserContext)
    const [formData, setFormData] = useState<UserInfo>({

            name: "",
            nachname: "",
            geschlecht: "",
            geschaeftsadresse: "",
            rolle: roleType.USER,
            pultnummer: 0,
            stock: 0,
            userid: (localStorage.getItem("userid")+ "").toString(),
            ort: "",
            gebaeude: "",
            bildUrl: "",
            telefonnummer: ""

        }
    )

    useEffect(() => {
        axios.get("/api/user/mitarbeiter/specific", {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("jwt")}`
            }
        }).then((res) => {
                setFormData({
                    name: res.data.name, nachname: res.data.nachname, geschlecht: res.data.geschlecht, geschaeftsadresse: res.data.geschaeftsadresse, rolle: res.data.rolle, ort: res.data.ort, gebaeude: res.data.gebaeude, bildUrl: res.data.bildUrl, stock: res.data.stock, userid: res.data.userid, telefonnummer: res.data.telefonnummer, pultnummer: res.data.pultnummer
                });
            }
        )
    }, []);
    const formatBase64Image = (data: string): string => {
        if (data && !data.startsWith('data:image')) {
            return `data:image/png;base64,${data}`;
        }
        return data;
    };

    const AdressbuchBildClick = () => {
        setUserId(formData.userid);
        navigate("/AllInfos");
    };

    const navigate = useNavigate();

    const handleChange = (event: { target: { value: To; }; }) => {
        if (event.target.value == "/Login"){
            localStorage.removeItem("jwt");
        }
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
            root.style.setProperty("--text-color-daten", "white");
            root.style.setProperty( "--circle-color1", "#1d2129");
            root.style.setProperty( "--circle-color2", "#373d4a");
            root.style.setProperty( "--input-fields", "#171717");
            root.style.setProperty("--layout-canvas", "#171717");
            root.style.setProperty("--background-color-elements", "#212121");
           root.style.setProperty( "--background-color-buttons", "#212121");
            document.body.classList.add('shadow-and-radius');
        } else {
            root.style.setProperty('--background-color', 'white');
            root.style.setProperty('--text-color', 'white');
            root.style.setProperty("--text-color-daten", "black");
            root.style.setProperty( "--circle-color1", "whitesmoke");
            root.style.setProperty( "--circle-color2", "white");
            root.style.setProperty( "--input-fields", "white");
            root.style.setProperty("--layout-canvas", "white");
            root.style.setProperty("--background-color-elements", "white");
            root.style.setProperty( "--background-color-buttons", "black")
            document.body.classList.remove('shadow-and-radius');
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
                <h4 id={"adressbuch-h4-title"} onClick={suchenav}>Adressbuch</h4>
                <h6 id="Profillist">
                    <select  onChange={handleChange} className="btn-layout shadow-and-radius" id={"dropdownLAYOUT"}>
                        <option value="">Profil</option>
                        <option value="/edit">Profil bearbeiten</option>
                        <option value="/Login">Logout</option>
                    </select>

                    <div>
                        {formData.bildUrl && <img src={formatBase64Image(formData.bildUrl)} onClick={AdressbuchBildClick} className={"shadow-and-radius"} id="layout-profile-picture" alt="BILD"/>}



                    </div>

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
