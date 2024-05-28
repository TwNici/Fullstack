import Layout from "./Layout.tsx";
import React, {useEffect, useRef, useState} from "react";
import {roleType, UserInfo} from "./App.tsx";
import axios from "axios";
import "./CSS/EditUserProfile.css"



function EditUserProfile() {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [ passwordData, setPasswordData] = useState<string>("");
    const [ passwordData2, setPasswordData2] = useState<string>("");
    const [formData, setFormData] = useState<UserInfo>({

            name: "",
            nachname: "",
            geschlecht: "",
            geschaeftsadresse: "",
            rolle: roleType.USER,
            pultnummer: 0,
            stock: 0,
            userid: (localStorage.getItem("userid")+ "").toString(),
            ort: "",
            gebaeude: "",
            bildUrl: "",
            telefonnummer: ""

        }
    )


    useEffect(() => {
        axios.get("/api/user/mitarbeiter/specific", {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("jwt")}`
            }
        }).then((res) => {
                setFormData({
                    name: res.data.name, nachname: res.data.nachname, geschlecht: res.data.geschlecht, geschaeftsadresse: res.data.geschaeftsadresse, rolle: res.data.rolle, ort: res.data.ort, gebaeude: res.data.gebaeude, bildUrl: res.data.bildUrl, stock: res.data.stock, userid: res.data.userid, telefonnummer: res.data.telefonnummer, pultnummer: res.data.pultnummer
                });
            }
        )
    }, []);

    const formatBase64Image = (data: string): string => {
        if (data && !data.startsWith('data:image')) {
            return `data:image/png;base64,${data}`;
        }
        return data;
    };


    const handleSubmit = () => {
        console.log(formData)
        axios.put("/api/user/mitarbeiter", formData, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("jwt")}`
            }
        } )
            .then(response => {
                console.log('Updated:', response.data);
            })
            .catch(error => console.error('Error updating', error));
    };
    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        const file = event.target.files ? event.target.files[0] : null;
        if (file) {
            const base64String = await fileToBase64(file);
            setFormData(prevForm => ({
                ...prevForm,
                bildUrl: base64String
            }));
        }
    };

    const fileToBase64 = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = error => reject(error);
            reader.readAsDataURL(file);
        });
    };

    const handlePwSubmit = () => {
        if (passwordData === passwordData2){
        axios.post("/api/user/mitarbeiter/password", passwordData, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("jwt")}`
            }
        }).then(() => {

        } )
        } else{
            alert("Passwort stimmt nicht überein")
        }
    }

    const handlePwChange = (value: string) => {
        setPasswordData(value)
    }

    const handlePwChange2 = (value: string) => {
        setPasswordData2(value)
    }


    return(
        <div>
            <Layout />
            <div id="editdatencanvasPW" className="canvas shadow-and-radius">
                <div className="InputfelderDesign" >
                <form onSubmit={(e) => {e.preventDefault()
                    handlePwSubmit(); }}>

                <label><h5 id="PWresetPOS">Passwort Reset</h5></label>
                <input id="InputFelderEdit1" placeholder="Neues Passwort" type="Password" onChange={(e) => handlePwChange(e.target.value)}/>
                    <button className={"btn-layout shadow-and-radius"} id={"editSaveButtonPW"} type={"submit"}>Save</button>
                </form>
                    <input id="InputFelderEdit2" placeholder="Neues Passwort Widerholen" type="Password" onChange={(e) => handlePwChange2(e.target.value)}/>
                </div>

            </div>
            <div id="editdatencanvasPICTURE" className="canvas shadow-and-radius">
                <form onSubmit={(e) => {e.preventDefault()
                    handleSubmit(); }}>
                <label htmlFor="dragDropEdit" className="btn-layout shadow-and-radius">Bild Hochladen / PNG</label>
                    <input ref={fileInputRef} id="dragDropEdit" type="file" name="bildUrl" required onChange={handleFileChange} />
                <button className={"btn-layout shadow-and-radius"} id={"editSaveButtonIMG"} type={"submit"}>Save</button>
                </form>
            </div>

            <img src={formData.bildUrl}  id="showeditPicture" className="canvas shadow-and-radius" alt={""}/>
            <div id="showeditProfil" className="canvas shadow-and-radius" >

                    <div className="canvas-container2">
                        <div id={"mdatentext"} className={"shadow-and-radius"}>
                            {formData.bildUrl && <img src={formatBase64Image(formData.bildUrl)}  className={"shadow-and-radius"} id="BildAdressbuch" alt="BILD"/>}
                            <p>{formData.name} {formData.nachname} ({formData.userid})</p>
                            <p>Tele: {formData.telefonnummer}</p>
                            <p>Geschlecht: {formData.geschlecht}</p>
                            <p>Rolle: {formData.rolle}</p>


                        </div>

                        <div id={"mdatentext3"} className={"shadow-and-radius"}>
                            <p>Geschäfts Adresse: {formData.geschaeftsadresse} </p>
                            <p>Stock: {formData.stock}</p>
                            <p>Pultnummer: {formData.pultnummer}</p>
                            <p>Gebäude: {formData.gebaeude}</p>
                            <p>Ort: {formData.ort}</p>
                        </div>
                    </div>
            </div>

        </div>
    );
}

export default EditUserProfile;