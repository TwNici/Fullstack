import axios from 'axios';
import './App.css';
import { useEffect, useState } from "react";
import Layout from "./Layout.tsx";
import {FormInputType} from "./App.tsx";
import { useNavigate } from 'react-router-dom';
import "./CSS/AdressbuchSide.css"


function DatenAnzeigen() {
    const [mitarbeiter, setMitarbeiter] = useState<FormInputType[]>([]);
    const [suchbegriff, setSuchbegriff] = useState('');
    const [gefilterteMitarbeiter, setGefilterteMitarbeiter] = useState<FormInputType[]>([]);

    const formatBase64Image = (data: string): string => {
        if (data && !data.startsWith('data:image')) {
            return `data:image/png;base64,${data}`;
        }
        return data;
    };

    useEffect(() => {
        axios.get<FormInputType[]>('/api/mitarbeiter')
            .then(response => {
                setMitarbeiter(response.data);
                setGefilterteMitarbeiter(response.data);
            })
            .catch(error => {
                console.error('FR to backend:', error);
            });
    }, []);

    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        const gefiltert = mitarbeiter.filter(m => {
            const fullName = `${m.name.toLowerCase()} ${m.nachname.toLowerCase()}`;
            return (
                fullName.includes(suchbegriff.toLowerCase()) ||
                m.name.toLowerCase().includes(suchbegriff.toLowerCase()) ||
                m.nachname.toLowerCase().includes(suchbegriff.toLowerCase()) ||
                m.userid.toLowerCase().includes(suchbegriff.toLowerCase())
            );
        });
        setGefilterteMitarbeiter(gefiltert);
    };


        const navigate = useNavigate();

    const AdressbuchBildClick = () => {
        navigate("/AllInfos");

    };

    return (
        <div>
            <Layout />
            <div id={"DivCanvasDel"}></div>
            <div id="suchleistencanvas" className={"shadow-and-radius"}>
                <form onSubmit={handleSubmit}>
                    <input
                        id="suchleiste"
                        className={"shadow-and-radius"}
                        type="search"
                        placeholder="Mitarbeiter Suchen..."
                        value={suchbegriff}
                        onChange={(e) => setSuchbegriff(e.target.value)}

                    />
                    <button id={"suchenButtonAdressbuch"} className={"btn-layout shadow-and-radius"} type="submit">Suchen</button>
                </form>
                <div id="treffertext" className={"shadow-and-radius"}>Treffer: {gefilterteMitarbeiter.length}</div>
            </div>
            <div id="datencanvas">
                {gefilterteMitarbeiter.map((mitarbeiter, index) => (
                    <div className="canvas-container flex-container shadow-and-radius" key={index}>
                        <div id={"mdatentext"} className={"shadow-and-radius"}>
                            {mitarbeiter.bildUrl && <img onClick={AdressbuchBildClick} src={formatBase64Image(mitarbeiter.bildUrl)} className={"shadow-and-radius"} id="BildAdressbuch" alt="BILD"/>}
                            <p>{mitarbeiter.name} {mitarbeiter.nachname} ({mitarbeiter.userid})</p>
                            <p>Tele: {mitarbeiter.telefonnummer}</p>
                            <p>Ort: {mitarbeiter.ort}</p>
                            <p>Geschlecht: {mitarbeiter.geschlecht}</p>
                            <p>Rolle: {mitarbeiter.rolle}</p>


                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default DatenAnzeigen;
