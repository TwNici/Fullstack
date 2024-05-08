import axios from 'axios';
import './App.css';
import { useEffect, useState } from "react";
import Layout from "./Layout.tsx";
import {FormInputType} from "./App.tsx";


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
        const gefiltert = mitarbeiter.filter(m =>
            m.name.toLowerCase().includes(suchbegriff.toLowerCase()) ||
            m.nachname.toLowerCase().includes(suchbegriff.toLowerCase()) ||
            m.userid.toLowerCase().includes(suchbegriff.toLowerCase())
        );
        setGefilterteMitarbeiter(gefiltert);
    };


    return (
        <div>
            <Layout />
            <div id="suchleistencanvas">
                <form onSubmit={handleSubmit}>
                    <input
                        id="suchleiste"
                        type="search"
                        placeholder="Mitarbeiter Suchen..."
                        value={suchbegriff}
                        onChange={(e) => setSuchbegriff(e.target.value)}
                        aria-label="Suche nach Mitarbeitern"
                    />
                    <button id={"suchenButtonAdressbuch"} className={"adressbuchbutton"} type="submit">Suchen</button>
                </form>
                <div id="treffertext">Treffer: {gefilterteMitarbeiter.length}</div>
            </div>
            <div id="datencanvas">
                {gefilterteMitarbeiter.map((mitarbeiter, index) => (
                    <div className="canvas-container" key={index}>
                        <div id={"mdatentext"}>
                            {mitarbeiter.bildUrl && <img src={formatBase64Image(mitarbeiter.bildUrl)} id="BildAdressbuch" alt="BILD"/>}
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
