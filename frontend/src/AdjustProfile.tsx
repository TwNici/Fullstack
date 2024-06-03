import axios from 'axios';
import './App.css';
import "./CSS/AdjustProfile.css"
import React, {useRef, useState} from "react";
import {FormInputType, roleType} from "./App.tsx";
import Layout from "./Layout.tsx";



function AdjustProfile() {
    const [userIdToDel, setUserIdToDel] = useState<string>("")
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [userId, setUserId] = useState<string>("");
    const [formData, setFormData] = useState<FormInputType>({
        pultnummer: 0,
        name: "",
        nachname: "",
        geschlecht: "",
        geschaeftsadresse: "",
        rolle: roleType.USER,
        initialPW: "",
        ort: "",
        gebaeude: "",
        bildUrl: "",
        telefonnummer: "",
        stock: 0,
        userid: ""
    });

    const handleInputChange = (name: string, value: string) => {
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };


    const handleSubmit = () => {
        axios.put(`/api/user/mitarbeiter`, formData, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("jwt")}`
            }
        })
            .then(response => {
                console.log('Updated successfully:', response.data);
            })
            .catch(error => console.error('Error updating user data:', error));
    };

    const deleteSubmit = (userId: string) => {
        axios.delete(`/api/user/mitarbeiter/${userId}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("jwt")}`
            }
        })
            .then(response => {
                console.log("Bye", response.data);
            })

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
            setFormData(prevForm => ({
                ...prevForm,
                bildUrl: base64String
            }));
        }
    };

    const handleGetUser = () => {
        axios.get(`/api/user/mitarbeiter/${userId}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("jwt")}`
            }
        }).then((res) => {
            setFormData({
                name: res.data.name, nachname: res.data.nachname, geschlecht: res.data.geschlecht, geschaeftsadresse: res.data.geschaeftsadresse, rolle: res.data.rolle, initialPW: res.data.InitialPW, ort: res.data.ort, gebaeude: res.data.gebaeude, bildUrl: res.data.bildUrl, stock: res.data.stock, userid: res.data.userid, telefonnummer: res.data.telefonnummer, pultnummer: res.data.pultnummer
            });
        })
    }
    return (<>
            <Layout />
            <form id={"search-form"} onSubmit={(e) => {
                e.preventDefault()
                handleGetUser()
            }}>
            <div>
                <button id={"searchUserIDButton"} className={"btn-layout shadow-and-radius"}>Suchen</button>
            </div>
            </form>
        <form id={"input-form"} onSubmit={(e) => {
            e.preventDefault()
            handleSubmit();
            }}>
            <div id={"labels"} className={"inputfelder-canvas shadow-and-radius"}>

                <div id={"mitarbeitertexttitel"} className={"shadow-and-radius"}><h1>Mitarbeiter anpassen</h1></div>
                <div>
                <label>Mitarbeiter auswählen:</label>
                    <input placeholder={"USERID"} id={"mitarbeiter-auswählen-profanpassung"} onChange={(e) => {setUserId(e.target.value)}} />
                </div>
                <div>
                    <label>Vorname:</label>
                    <input  id="name" name="name" value={formData.name} onChange={(e) => {handleInputChange(e.target.name, e.target.value)}} maxLength={16}/>
                </div>
                <div>
                    <label>Nachname:</label>
                    <input  id="nachname" name="nachname" value={formData.nachname} onChange={(e) => {handleInputChange(e.target.name, e.target.value)}} maxLength={16}/>
                </div>
                <div>
                    <label>Geschlecht:</label>
                    <input  id="geschlecht" name="geschlecht" value={formData.geschlecht} onChange={(e) => {handleInputChange(e.target.name, e.target.value)}}  maxLength={1} />
                </div>

                <div>
                    <label>Telefonnummer:</label>
                    <input  id="tele"  type={"tel"} pattern="[+][0-9]{2}[0-9]{2}[0-9]{3}[0-9]{4}" required name="telefonnummer" value={formData.telefonnummer} onChange={(e) => {handleInputChange(e.target.name, e.target.value)}}/>
                </div>
                <div>
                    <label>Ort:</label>
                    <input  id="ort" name="ort" value={formData.ort} onChange={(e) => {handleInputChange(e.target.name, e.target.value)}} maxLength={36}/>
                </div>
                <div>
                    <label>Initial Passwort:</label>
                    <input  id="initialPW" name="initialPW" type={"Password"} value={formData.initialPW} onChange={(e) => {handleInputChange(e.target.name, e.target.value)}}/>
                </div>
                <div>
                    <label>Rolle:</label>
                    <select id={"rolleCreatemitabeiter"} name={"rolle"} value={formData.rolle} onChange={(e) => {handleInputChange(e.target.name, e.target.value)}}>
                        <option value={roleType.USER}>User</option>
                        <option value={roleType.ADMIN}>Admin</option>
                    </select>
                </div>

                <div>
                    <label>Geschäfts Adresse:</label>
                    <input  id="geschaeftsadresse" name="geschaeftsadresse" value={formData.geschaeftsadresse} onChange={(e) => {handleInputChange(e.target.name, e.target.value)}} maxLength={36} />
                </div>
                <div>
                    <label>Stock:</label>
                    <input  id="stock" name="stock" type={"number"} value={formData.stock} onChange={(e) => {handleInputChange(e.target.name, e.target.value)}} maxLength={2}/>
                </div>
                <div>
                    <label>Pultnummer:</label>
                    <input type="number" id="pultnummer" name="pultnummer" value={formData.pultnummer} onChange={(e) => {handleInputChange(e.target.name, e.target.value)}} maxLength={5}/>
                </div>
                <div>
                    <label>Gebäude:</label>
                    <input  id="gebaeude" name="gebaeude" value={formData.gebaeude} onChange={(e) => {handleInputChange(e.target.name, e.target.value)}} maxLength={36} />
                </div>
                <div>
                    <label htmlFor="dragDrop" className="btn-layout shadow-and-radius">Bild Hochladen / PNG</label>
                    <input ref={fileInputRef} id="dragDrop" type="file" name="bildUrl" onChange={handleFileChange} />
                </div>
                <button type={"submit"} className="btn-layout shadow-and-radius">Mitarbeiter speichern</button>
            </div>
        </form>
            <div className={"shadow-and-radius"} id={"canvas-delete-user"}>
                <form id={"input-form"} onSubmit={(e) => {
                    e.preventDefault()
                    deleteSubmit(userIdToDel);

                }}>
                <div>
                    <div id={"delete-mitarbeiter-canvas"} className={"shadow-and-radius"}>
                    <h2 id={"delete-mitarbeiter-h2-text"}>Mitarbeiter Löschen</h2>
                    <input placeholder={"USERID"} id={"delete-mitarbeiter-inputfeld"} onChange={(e) => setUserIdToDel(e.target.value)} />
                    <button type={"submit"} id={"delete-mitarbeiter-btn"} className="btn-layout shadow-and-radius">Mitarbeiter Löschen</button>
                    </div>
                </div>
                </form>
            </div>
        </>

    );
}
    export default AdjustProfile