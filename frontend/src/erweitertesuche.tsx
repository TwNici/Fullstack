
import {useState} from "react";
import Layout from "./Layout.tsx";

type suchType = {
    criteria: string;
    operator: string;
    userdata: string;
}

function Erweitertesuche() {

    const [suche, setSuche] = useState<suchType>({
        criteria: "",
        operator: "",
        userdata: "",
    })

    const handleChange = (name: string, value: string) => {
        setSuche({
            ...suche,
            [name]: value
        })
    }

    return (
        <div>
            <div id="suchleistencanvas">
                <input name={"criteria"} id="suchleiste" placeholder="Suchkriterium..." type={"search"} onChange={(e) => {
                    e.preventDefault();
                    handleChange(e.target.name, e.target.value);
                }}/>
                <select id="operator" name="operator" onChange={(e) => {
                    e.preventDefault();
                    handleChange(e.target.name, e.target.value)}}>
                    <option value="=">=</option>
                    <option value=">"> {">"} </option>
                    <option value=">="> {">="} </option>
                    <option value="<"> {"<"} </option>
                    <option value="<=">{"<="}</option>
                    <option value="≠">≠</option>
                </select>
                <select id="userdata" name="userdata" onChange={(e) => {
                    e.preventDefault();
                    handleChange(e.target.name, e.target.value);}}>
                    <option value="Nachname">Nachname</option>
                    <option value="Vorname"> Vorname</option>
                    <option value="UserID"> UserID</option>
                    <option value="Geschlecht"> Geschlecht </option>
                    <option value="Telefon">Telefon</option>
                    <option value="Ort">Ort</option>
                    <option value="Strasse">Strasse</option>
                    <option value="Privat Adresse">Privat Adresse</option>
                    <option value="Geschäfts Adresse">Geschäfts Adresse</option>
                    <option value="Stock">Stock</option>
                    <option value="Pultnummer">Pultnummer</option>
                    <option value="Gebäude">Gebäude</option>
                </select>
                <div id="treffertexterweiterte">Treffer: </div>

            </div>
            <Layout />
            <div id="datencanvas">

                        <div id={"mdatentext"}>

                        </div>
                    </div>

            </div>
    );

}
export default Erweitertesuche