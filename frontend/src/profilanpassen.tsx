
import axios from 'axios';
import './App.css';
import React, {useRef, useState} from "react";
import {FormInputType} from "./App.tsx";


function ProfilAnpassen() {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [userId, setUserId] = useState<string>("");
    const [formData, setFormData] = useState<FormInputType>({
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
        stock: 0,
        userid: "",
        newUserid: "",
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };


    const handleSubmit = () => {
        axios.put(`/api/mitarbeiter/${formData.userid}`, {name: formData.name, nachname: formData.nachname,
            geschlecht: formData.geschlecht, geschaeftsadresse: formData.geschaeftsadresse, privatadresse: formData.privatadresse,
            strasse: formData.strasse,
            ort: formData.ort,
            gebaeude: formData.gebaeude,
            bildUrl: formData.bildUrl,
            telefonnummer: formData.telefonnummer, stock: formData.stock,
            userid: formData.newUserid})
            .then(response => {
                console.log('Updated successfully:', response.data);
            })
            .catch(error => console.error('Error updating user data:', error));
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
        axios.get(`/api/mitarbeiter/${userId}`).then((res) => {
            setFormData({
                name: res.data.name, nachname: res.data.nachname, geschlecht: res.data.geschlecht, geschaeftsadresse: res.data.geschaeftsadresse, privatadresse: res.data.privatadresse, strasse: res.data.strasse, ort: res.data.ort, gebaeude: res.data.gebaeude, bildUrl: res.data.bildUrl, newUserid: res.data.userid, stock: res.data.stock, userid: undefined, telefonnummer: res.data.telefonnummer, pultnummer: res.data.pultnummer
            });
        })
    }

    return (<>
        <form id={"search-form"} onSubmit={(e) => {
            e.preventDefault()
            handleGetUser()
        }}>
            <div>
                <label>Mitarbeiter auswählen:</label>
                <input placeholder={"USERID"} id="userid" onChange={(e) => {setUserId(e.target.value)}} />
            </div>
        </form>
        <form onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
            }}>
            <div id={"labels"} className={"inputfelder"}>
                <div id={"mitarbeitertexttitel"}><h1>Mitarbeiter anpassen</h1></div>
                <div>
                    <label>UserID</label>
                    <input placeholder={"Neue User ID"} id="newUserid" name="newUserid" value={formData.newUserid}  onChange={handleInputChange} />
                </div>
                <div>
                    <label>Vorname:</label>
                    <input  id="name" name="name" value={formData.name} onChange={handleInputChange}/>
                </div>
                <div>
                    <label>Nachname:</label>
                    <input  id="nachname" name="nachname" value={formData.nachname} onChange={handleInputChange}/>
                </div>
                <div>
                    <label>Geschlecht:</label>
                    <input  id="geschlecht" /* type={"checkbox"} */ name="geschlecht" value={formData.geschlecht} onChange={handleInputChange}/>
                </div>
                <div>
                    <label>Telefonnummer:</label>
                    <input  id="tele"  type={"tel"} pattern="[+][0-9]{2}[0-9]{2}[0-9]{3}[0-9]{4}" required name="telefonnummer" value={formData.telefonnummer} onChange={handleInputChange}/>
                </div>
                <div>
                    <label>Ort:</label>
                    <input  id="ort" name="ort" value={formData.ort} onChange={handleInputChange}/>
                </div>
                <div>
                    <label>Strasse:</label>
                    <input  id="strasse" name="strasse" value={formData.strasse} onChange={handleInputChange}/>
                </div>
                <div>
                    <label>Privat Adresse:</label>
                    <input  id="privatadresse" name="privatadresse" value={formData.privatadresse} onChange={handleInputChange}/>
                </div>
                <div>
                    <label>Geschäfts Adresse:</label>
                    <input  id="geschaeftsadresse" name="geschaeftsadresse" value={formData.geschaeftsadresse} onChange={handleInputChange}/>
                </div>
                <div>
                    <label>Stock:</label>
                    <input  id="stock" name="stock" type={"number"} value={formData.stock} onChange={handleInputChange}/>
                </div>
                <div>
                    <label>Pultnummer:</label>
                    <input type="number" id="pultnummer" name="pultnummer" value={formData.pultnummer} onChange={handleInputChange}/>
                </div>
                <div>
                    <label>Gebäude:</label>
                    <input  id="gebaeude" name="gebaeude" value={formData.gebaeude} onChange={handleInputChange}/>
                </div>
                <div>
                    <label>Bild Url:</label>
                    <input ref={fileInputRef} id="dragDrop" type="file" name="bildUrl" required onChange={handleFileChange} />
                </div>
                <button type={"submit"} className="adressbuchbutton">Mitarbeiter speichern</button>
            </div>
        </form>
        </>
    );
}
    export default ProfilAnpassen