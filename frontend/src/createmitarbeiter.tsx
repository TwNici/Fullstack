import React, { useState } from "react";

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
    status: string;
    species: string;
    geschlecht: string;
};

function CreateMitarbeiter() {
    const [form, setForm] = useState<FormInputType>({
        name: "",
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

    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>VName:</label>
                <input id="name" name="name"  value={form.name} onChange={(e) => onChangeValues(e.target.name, e.target.value)} />
            </div>
            <div>
                <label>NName:</label>
                <input id="nname" name="nname"  value={form.status} onChange={(e) => onChangeValues(e.target.name, e.target.value)} />
            </div>
            <div>
                <label>Geschlecht:</label>
                <input id="geschlecht" name="geschlecht"  value={form.geschlecht} onChange={(e) => onChangeValues(e.target.name, e.target.value)} />
            </div>
            <div>
                <label>Telefonnummer:</label>
                <input id="tele" name="tele"  value={form.tele} onChange={(e) => onChangeValues(e.target.name, e.target.value)} />
            </div>
            <div>
                <label>UserID</label>
                <input id="userid" name="userid"  value={form.userid} onChange={(e) => onChangeValues(e.target.name, e.target.value)} />
            </div>
            <div>
                <label>Ort:</label>
                <input id="ort" name="ort"  value={form.ort} onChange={(e) => onChangeValues(e.target.name, e.target.value)} />
            </div>
            <div>
                <label>Strasse:</label>
                <input id="strasse" name="strasse"  value={form.strasse} onChange={(e) => onChangeValues(e.target.name, e.target.value)} />
            </div>
            <div>
                <label>Privat Adresse:</label>
                <input id="privatadresse" name="privatadresse"  value={form.privatadresse} onChange={(e) => onChangeValues(e.target.name, e.target.value)} />
            </div>
            <div>
                <label>Geschäfts Adresse:</label>
                <input id="geschaeftsadresse" name="geschaeftsadresse"  value={form.geschaeftsadresse} onChange={(e) => onChangeValues(e.target.name, e.target.value)} />
            </div>
            <div>
                <label>Stock:</label>
                <input id="stock" name="stock"  value={form.stock} onChange={(e) => onChangeValues(e.target.name, e.target.value)} />
            </div>
            <div>
                <label>Pultnummer:</label>
                <input id="pultnummer" name="pultnummer"  value={form.pultnummer} onChange={(e) => onChangeValues(e.target.name, e.target.value)} />
            </div>
            <div>
                <label>Gebäude:</label>
                <input id="gebaeude" name="gebaeude"  value={form.gebaeude} onChange={(e) => onChangeValues(e.target.name, e.target.value)} />
            </div>
            <button type="submit">Mitarbeiter speichern</button>
        </form>
    );
}

export default  CreateMitarbeiter;
