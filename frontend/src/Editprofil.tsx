import Layout from "./Layout.tsx";
import {useEffect, useState} from "react";
import {FormInputType, roleType} from "./App.tsx";
import axios, {AxiosResponse} from "axios";

function Editprofil() {

    const [formData, setFormData] = useState<FormInputType>({
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

        }
    )

    const userid = localStorage.getItem("userid")

    useEffect(() => {
        localStorage.setItem("userid", "JUAN1")
        axios.get(`/api/mitarbeiter/${userid}`).then((res: AxiosResponse<FormInputType>) => {
            setFormData({
                name: res.data.name, nachname: res.data.nachname, geschlecht: res.data.geschlecht, geschaeftsadresse: res.data.geschaeftsadresse, rolle: res.data.rolle, initialPW: res.data.initialPW, ort: res.data.ort, gebaeude: res.data.gebaeude, bildUrl: res.data.bildUrl, newUserid: res.data.userid, stock: res.data.stock, userid: undefined, telefonnummer: res.data.telefonnummer, pultnummer: res.data.pultnummer
            });
        })
    }, []);

    return(
        <div>
            <Layout />
            <div id="editdatencanvasPW" className="canvas">
                <div className="InputfelderDesign" >
                <label><h5 id="PWresetPOS">Passwort Reset</h5></label>
                <input id="InputFelderEdit1" placeholder="Neues Passwort" type="Password" />
                <input id="InputFelderEdit2" placeholder="Neues Passwort Widerholen" type="Password" />
                </div>
            </div>
            <div id="editdatencanvasPICTURE" className="canvas">
                <label htmlFor="dragDropEdit" className="adressbuchbutton">Bild Hochladen / PNG</label>
                <input  id="dragDropEdit" type="file" name="bildUrl" required />
            </div>

            <img src={formData.bildUrl} id="showeditPicture" className="canvas"/>
            <div id="showeditProfil" className="canvas" ></div>
        </div>
    );
}

export default Editprofil;