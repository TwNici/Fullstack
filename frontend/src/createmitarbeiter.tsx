import React, {useEffect, useRef, useState} from "react";
import './App.css';
import axios from "axios";
import {FormInputType, roleType} from "./App.tsx";
import Layout from "./Layout.tsx";
import "./CSS/CreateMitarbeiterSide.css"

function CreateMitarbeiter() {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [form, setForm] = useState<FormInputType>({
        pultnummer: 0, stock: 0, userid: "",
        name: "",
        nachname: "",
        geschlecht: "",
        geschaeftsadresse: "",
        rolle: roleType.USER,
        initialPW: "",
        ort: "",
        gebaeude: "",
        bildUrl: "",
        telefonnummer: ""

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

        axios.post("/api/auth/register", form)
            .then(response => {
                console.log('Mitarbeiter gespeichert:', response.data);
                if (fileInputRef.current) {
                    fileInputRef.current.value = '';
                }
                setForm({
                    pultnummer: 0, stock: 0, userid: "",
                    name: "",
                    nachname: "",
                    geschlecht: "",
                    geschaeftsadresse: "",
                    rolle: roleType.USER,
                    initialPW: "",
                    ort: "",
                    gebaeude: "",
                    bildUrl: "",
                    telefonnummer: ""
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

    useEffect(() => {

    }, []);

        return (

            <form onSubmit={handleSubmit}>
                <Layout />
                <div>
                    <div id={"labels"} className={"inputfelder-canvas shadow-and-radius"}>
                        <div id={"mitarbeitertexttitel"} className={"shadow-and-radius"}><h1>Mitarbeiter eintragen</h1></div>
                        <div>
                            <label>Vorname:</label>
                            <input id="name" name="name" required value={form.name}
                                   onChange={(e) => onChangeValues(e.target.name, e.target.value)} maxLength={16}/>
                        </div>
                        <div>
                            <label>Nachname:</label>
                            <input id="nachname" name="nachname" required value={form.nachname}
                                   onChange={(e) => onChangeValues(e.target.name, e.target.value)}maxLength={16}/>
                        </div>
                        <div>
                            <label>Geschlecht:</label>
                            <input id="geschlecht" name="geschlecht" required value={form.geschlecht}
                                   onChange={(e) => onChangeValues(e.target.name, e.target.value)} maxLength={1}/>
                        </div>
                        <div>
                            <label>Telefonnummer:</label>
                            <input id="tele" name="telefonnummer"   type={"tel"} pattern="[+][0-9]{2}[0-9]{2}[0-9]{3}[0-9]{4}" required value={form.telefonnummer}
                                   onChange={(e) => onChangeValues(e.target.name, e.target.value)}/>
                        </div>
                        <div>
                            <label>UserID:</label>
                            <input id="userid" name="userid" required value={form.userid}
                                   onChange={(e) => onChangeValues(e.target.name, e.target.value)} maxLength={5}/>
                        </div>
                        <div>
                            <label>Ort:</label>
                            <input id="ort" name="ort" required value={form.ort}
                                   onChange={(e) => onChangeValues(e.target.name, e.target.value)} maxLength={11}/>
                        </div>
                        <div>
                            <label>Initial Passwort:</label>
                            <input id="initialPW" name="initialPW" type={"Password"} required value={form.initialPW}
                                   onChange={(e) => onChangeValues(e.target.name, e.target.value)}/>
                        </div>
                        <div>
                            <label>Rolle:</label>
                            <select id={"rolleCreatemitabeiter"} name={"rolle"} onChange={(e) => { onChangeValues(e.target.name, e.target.value); }}>
                                <option value={roleType.USER}>User</option>
                                <option value={roleType.ADMIN}>Admin</option>
                            </select>
                        </div>
                        <div>
                            <label>Geschäfts Adresse:</label>
                            <input id="geschaeftsadresse" name="geschaeftsadresse" required
                                   value={form.geschaeftsadresse}
                                   onChange={(e) => onChangeValues(e.target.name, e.target.value)} maxLength={36}/>
                        </div>
                        <div>
                            <label>Stock:</label>
                            <input id="stock" name="stock" type={"number"} required value={form.stock}
                                   onChange={(e) => onChangeValues(e.target.name, e.target.value)} maxLength={2}/>
                        </div>
                        <div>
                            <label>Pultnummer:</label>
                            <input id="pultnummer" type="number" name="pultnummer" required value={form.pultnummer}
                                   onChange={(e) => onChangeValues(e.target.name, e.target.value)} maxLength={5}/>
                        </div>
                        <div>
                            <label>Gebäude:</label>
                            <input id="gebaeude" name="gebaeude" required value={form.gebaeude}
                                   onChange={(e) => onChangeValues(e.target.name, e.target.value)} maxLength={5}/>
                        </div>
                        <div>
                            <label htmlFor="dragDrop" className="btn-layout shadow-and-radius">Bild Hochladen / PNG</label>
                            <input ref={fileInputRef} id="dragDrop" type="file" name="bildUrl" required onChange={handleFileChange}/>
                        </div>
                        <button type="submit" className="btn-layout shadow-and-radius">Mitarbeiter speichern</button>
                    </div>
                </div>
            </form>
        );
    }

export default  CreateMitarbeiter;
