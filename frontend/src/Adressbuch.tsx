import axios from 'axios';
import './App.css';
import { InterfaceDaten } from './InterfaceDaten.tsx';
import { useEffect, useState } from "react";
import Layout from "./Layout.tsx";


function DatenAnzeigen() {
    const [mitarbeiter, setMitarbeiter] = useState<InterfaceDaten[]>([]);
    const [suchbegriff, setSuchbegriff] = useState('');
    const [gefilterteMitarbeiter, setGefilterteMitarbeiter] = useState<InterfaceDaten[]>([]);

    const formatBase64Image = (data: string): string => {
        if (data && !data.startsWith('data:image')) {
            return `data:image/png;base64,${data}`;
        }
        return data;
    };

    useEffect(() => {
        axios.get<InterfaceDaten[]>('/api/mitarbeiter')
            .then(response => {
                setMitarbeiter(response.data);
                setGefilterteMitarbeiter(response.data);
            })
            .catch(error => {
                console.error('FR to backend:', error);
            });
    }, []);

    useEffect(() => {
        const gefiltert = mitarbeiter.filter(m =>
            m.name.toLowerCase().includes(suchbegriff.toLowerCase()) ||
            m.nachname.toLowerCase().includes(suchbegriff.toLowerCase()) ||
            m.userid.toLowerCase().includes(suchbegriff.toLowerCase())
        );
        setGefilterteMitarbeiter(gefiltert);
    }, [suchbegriff, mitarbeiter]);

    return (
        <div>
            <Layout />
            <div id="suchleistencanvas">
                <input id="suchleiste" placeholder="Mitarbeiter Suchen..." type={"search"} value={suchbegriff} onChange={(e) => setSuchbegriff(e.target.value)}/>
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
