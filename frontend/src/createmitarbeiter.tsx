import React, {useRef, useState} from "react";
import './App.css';
import axios from "axios";
import {FormInputType} from "./App.tsx";



function CreateMitarbeiter() {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [form, setForm] = useState<FormInputType>({
        name: "",
        nachname: "",
        geschlecht: "",
        geschaeftsadresse: "",
        privatadresse: "",
        strasse: "",
        ort: "",
        gebaeude: "",
        bildUrl: "",
        telefonnummer: "",

    });

    const onChangeValues = (name: string, value: string) => {

            setForm(prevForm => ({
                ...prevForm,
                [name]: value,
            }));
        }
        ;

    const handleSubmit = (ev: React.FormEvent) => {
        ev.preventDefault();

        axios.post("/api/mitarbeiter", form)
            .then(response => {
                console.log('Mitarbeiter gespeichert:', response.data);
                // Reset file input
                if (fileInputRef.current) {
                    fileInputRef.current.value = '';
                }
                // Reset the rest of the form state
                setForm({
                    name: "",
                    nachname: "",
                    geschlecht: "",
                    geschaeftsadresse: "",
                    privatadresse: "",
                    strasse: "",
                    ort: "",
                    gebaeude: "",
                    bildUrl: "",
                    telefonnummer: "",
                });
            })
            .catch(error => {
                console.error('Fehler beim Senden an den Server', error);
            });
    };


    const fileToBase64 = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = error => reject(error);
            reader.readAsDataURL(file);
        });
    };

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files ? event.target.files[0] : null;
        if (file) {
            const base64String = await fileToBase64(file);
            setForm(prevForm => ({
                ...prevForm,
                bildUrl: base64String
            }));
        }
    };

        return (
            <form onSubmit={handleSubmit}>
                <div>
                    <div id={"labels"} className={"inputfelder"}>
                        <div id={"mitarbeitertexttitel"}><h1>Mitarbeiter eintragen</h1></div>
                        <div>
                            <label>Vorname:</label>
                            <input id="name" name="name" required value={form.name}
                                   onChange={(e) => onChangeValues(e.target.name, e.target.value)}/>
                        </div>
                        <div>
                            <label>Nachname:</label>
                            <input id="nachname" name="nachname" required value={form.nachname}
                                   onChange={(e) => onChangeValues(e.target.name, e.target.value)}/>
                        </div>
                        <div>
                            <label>Geschlecht:</label>
                            <input id="geschlecht" name="geschlecht" required value={form.geschlecht}
                                   onChange={(e) => onChangeValues(e.target.name, e.target.value)}/>
                        </div>
                        <div>
                            <label>Telefonnummer:</label>
                            <input id="tele" name="telefonnummer" required value={form.telefonnummer}
                                   onChange={(e) => onChangeValues(e.target.name, e.target.value)}/>
                        </div>
                        <div>
                            <label>UserID:</label>
                            <input id="userid" name="userid" required value={form.userid}
                                   onChange={(e) => onChangeValues(e.target.name, e.target.value)}/>
                        </div>
                        <div>
                            <label>Ort:</label>
                            <input id="ort" name="ort" required value={form.ort}
                                   onChange={(e) => onChangeValues(e.target.name, e.target.value)}/>
                        </div>
                        <div>
                            <label>Strasse:</label>
                            <input id="strasse" name="strasse" required value={form.strasse}
                                   onChange={(e) => onChangeValues(e.target.name, e.target.value)}/>
                        </div>
                        <div>
                            <label>Privat Adresse:</label>
                            <input id="privatadresse" name="privatadresse" required value={form.privatadresse}
                                   onChange={(e) => onChangeValues(e.target.name, e.target.value)}/>
                        </div>
                        <div>
                            <label>Geschäfts Adresse:</label>
                            <input id="geschaeftsadresse" name="geschaeftsadresse" required
                                   value={form.geschaeftsadresse}
                                   onChange={(e) => onChangeValues(e.target.name, e.target.value)}/>
                        </div>
                        <div>
                            <label>Stock:</label>
                            <input id="stock" name="stock" required value={form.stock}
                                   onChange={(e) => onChangeValues(e.target.name, e.target.value)}/>
                        </div>
                        <div>
                            <label>Pultnummer:</label>
                            <input id="pultnummer" type="number" name="pultnummer" required value={form.pultnummer}
                                   onChange={(e) => onChangeValues(e.target.name, e.target.value)}/>
                        </div>
                        <div>
                            <label>Gebäude:</label>
                            <input id="gebaeude" name="gebaeude" required value={form.gebaeude}
                                   onChange={(e) => onChangeValues(e.target.name, e.target.value)}/>
                        </div>
                        <div>
                            <label>Bild Url:</label>
                            <input ref={fileInputRef} id="dragDrop" type="file" name="bildUrl" required onChange={handleFileChange} />

                        </div>
                        <button type="submit" className="adressbuchbutton">Mitarbeiter speichern</button>
                    </div>
                </div>
            </form>
        );
    }

export default  CreateMitarbeiter;
