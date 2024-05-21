import Layout from './Layout';
import {useContext, useEffect, useState} from "react";
import {roleType, UserContext, UserInfo} from "./App.tsx";
import axios from "axios";
import "./CSS/InfoOverview.css"

function InfoOverview() {
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
    const {userId} = useContext(UserContext)


    useEffect(() => {
        axios.get("/api/user/mitarbeiter/specific/" + userId, {
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




    return(
        <div>
            <Layout />


            <div id="canvasDatenFromContainer" className={"shadow-and-radius"}>
                <img src={formData.bildUrl} id="AllDatenCanvasPICTURE" className={"shadow-and-radius"}/>
                <div id="canvas-container3" >
                    <div id={"mdatentextINFOS1"} className={"shadow-and-radius"}>
                        <h5>Personen Daten</h5>
                        <p>{formData.name} {formData.nachname} ({formData.userid})</p>
                        <p>Tele: {formData.telefonnummer}</p>
                        <p>Ort: {formData.ort}</p>
                        <p>Geschlecht: {formData.geschlecht}</p>
                        <p>Rolle: {formData.rolle}</p>


                        <div id={"mdatentextINFOS2"} className={"shadow-and-radius"}>
                            <h5>Arbeitsort</h5>
                            <p>Geschäfts Adresse: {formData.geschaeftsadresse} </p>
                            <p>Stock: {formData.stock}</p>
                            <p>Pultnummer: {formData.pultnummer}</p>
                            <p>Gebäude: {formData.gebaeude}</p>


                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}



export default InfoOverview;
