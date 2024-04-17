import React, { useState } from "react";
import './App.css';
import axios from "axios";

export type FormInputType = {
    stock?: number;
    geschaeftsadresse: string;
    privatadresse: string;
    strasse: string;
    ort: string;
    userid?: number;
    pultnummer?: number;
    gebaeude: string;
    tele?: number;
    id?: number;
    name: string;
    nachname: string;
    status: string;
    species: string;
    geschlecht: string;
};

function CreateMitarbeiter() {
    const [form, setForm] = useState<FormInputType>({
        name: "",
        nachname: "",
        status: "",
        species: "",
        geschlecht: "",
        geschaeftsadresse: "",
        privatadresse: "",
        strasse: "",
        ort: "",
        gebaeude: "",

    });

    const onChangeValues = (name: string, value: string) => {
        setForm(prevForm => ({
            ...prevForm,
            [name]: value,
        }));
    };

    const handleSubmit = (ev: React.FormEvent) => {
        ev.preventDefault();
        console.log(form);



        axios.post("/api/mitarbeiter", form)
            .then(response => {
                console.log('Mitarbeiter gespeichert:', response.data);
            })
            .catch(error => {
                console.error('Fehler beim Speichern des Mitarbeiters:', error);
            });
    };

    return (
        <div onSubmit={handleSubmit}>
            <div id={"labels"} className={"inputfelder"}>
                <div>
                    <label>Vorname:</label>
                    <input id="name" name="name" required value={form.name} onChange={(e) => onChangeValues(e.target.name, e.target.value)} />
                </div>
                <div>
                    <label>Nachname:</label>
                    <input id="nachname" name="nachname" required value={form.nachname} onChange={(e) => onChangeValues(e.target.name, e.target.value)} />
                </div>
                <div>
                    <label>Geschlecht:</label>
                    <input id="geschlecht" name="geschlecht" required value={form.geschlecht} onChange={(e) => onChangeValues(e.target.name, e.target.value)} />
                </div>
                <div>
                    <label>Telefonnummer:</label>
                    <input id="tele" name="tele" required value={form.tele} onChange={(e) => onChangeValues(e.target.name, e.target.value)} />
                </div>
                <div>
                    <label>UserID:</label>
                    <input id="userid" name="userid" required value={form.userid} onChange={(e) => onChangeValues(e.target.name, e.target.value)} />
                </div>
                <div>
                    <label>Ort:</label>
                    <input id="ort" name="ort" required value={form.ort} onChange={(e) => onChangeValues(e.target.name, e.target.value)} />
                </div>
                <div>
                    <label>Strasse:</label>
                    <input id="strasse" name="strasse" required value={form.strasse} onChange={(e) => onChangeValues(e.target.name, e.target.value)} />
                </div>
                <div>
                    <label>Privat Adresse:</label>
                    <input id="privatadresse" name="privatadresse" required value={form.privatadresse} onChange={(e) => onChangeValues(e.target.name, e.target.value)} />
                </div>
                <div>
                    <label>Geschäfts Adresse:</label>
                    <input id="geschaeftsadresse" name="geschaeftsadresse" required value={form.geschaeftsadresse} onChange={(e) => onChangeValues(e.target.name, e.target.value)} />
                </div>
                <div>
                    <label>Stock:</label>
                    <input id="stock" name="stock" required value={form.stock} onChange={(e) => onChangeValues(e.target.name, e.target.value)} />
                </div>
                <div>
                    <label>Pultnummer:</label>
                    <input id="pultnummer" name="pultnummer" required value={form.pultnummer} onChange={(e) => onChangeValues(e.target.name, e.target.value)} />
                </div>
                <div>
                    <label>Gebäude:</label>
                    <input id="gebaeude" name="gebaeude" required value={form.gebaeude} onChange={(e) => onChangeValues(e.target.name, e.target.value)} />
                </div>
                <button className="adressbuchbutton" >Mitarbeiter speichern</button>
            </div>
            <div id={"mitarbeitertexttitel"}><h1>Mitarbeiter eintragen</h1></div>
        </div>
    );
}

export default  CreateMitarbeiter;
