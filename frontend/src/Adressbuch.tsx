import axios from 'axios';
import {useEffect, useState} from "react";
import './App.css';

function DatenAnzeigen() {
    const [daten, setDaten] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/mitarbeiter');
                setDaten(response.data);
            } catch (error) {
                setError('Fehler beim Abrufen der Daten: ' + error.message);
                console.error('Fehler beim Abrufen der Daten:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <h1>Mitarbeiterdaten</h1>
            {error ? (
                <p>{error}</p>
            ) : (
                <ul>
                    {daten.length > 0 ? (
                        daten.map(mitarbeiter => (
                            <li key={mitarbeiter.mitarbeiterId}>
                                {mitarbeiter.vorname} {mitarbeiter.nachname} - {mitarbeiter.email}
                            </li>
                        ))
                    ) : (
                        <p>Keine Daten gefunden</p>
                    )}
                </ul>
            )}
            <div id={"datencanvas"}></div>
            <div id={"suchleistencanvas"}>Treffer:</div>
        </div>
    );
}

export default DatenAnzeigen;
